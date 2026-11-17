import { readFile, writeFile, rename } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { documentsToEditorial, editableDocuments, sanityQuery } from "./sanity-content.mjs";
import { validateContent } from "./validate-content.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const folder = resolve(root, "src/data/editorial");
const readJson = async (name) => JSON.parse(await readFile(resolve(root, name), "utf8"));

export async function pullSanityContent({ projectId = process.env.SANITY_PROJECT_ID, dataset = process.env.SANITY_DATASET || "production" } = {}) {
  if (!projectId) {
    if (process.env.SANITY_CONTENT_REQUIRED === "true") {
      throw new Error("Sanity content is required for this deployment, but SANITY_PROJECT_ID is missing");
    }
    console.log("Sanity project is not connected; using the approved checked-in editorial content.");
    return false;
  }
  if (!/^[a-z0-9-]{4,30}$/.test(projectId) || !/^[a-z0-9_-]{1,64}$/.test(dataset)) {
    throw new Error("Invalid Sanity project ID or dataset");
  }
  const url = new URL(`https://${projectId}.api.sanity.io/v2025-02-19/data/query/${dataset}`);
  url.searchParams.set("query", sanityQuery);
  const response = await fetch(url, { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(20_000) });
  if (!response.ok) throw new Error(`Sanity published-content request failed (HTTP ${response.status})`);
  const payload = await response.json();
  if (!Array.isArray(payload.result)) throw new Error("Sanity returned an invalid result");
  const mapped = documentsToEditorial(payload.result);
  const site = await readJson("src/data/site.json");
  validateContent({
    ...site,
    announcements: mapped["announcements.json"],
    gatherings: mapped["gatherings.json"],
    ministries: mapped["ministries.json"],
    team: mapped["team.json"],
    sermons: mapped["sermons.json"],
    participation: mapped["participation.json"],
  });
  // Validate every collection first; never publish a partly synced dataset.
  for (const { file } of Object.values(editableDocuments)) {
    const target = resolve(folder, file);
    const temp = `${target}.sanity-tmp`;
    await writeFile(temp, `${JSON.stringify(mapped[file], null, 2)}\n`);
    await rename(temp, target);
  }
  console.log("Verified five required Sanity sections and optional approved team profiles for the website build.");
  return true;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  pullSanityContent().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
