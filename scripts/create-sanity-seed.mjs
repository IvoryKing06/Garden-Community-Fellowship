import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { editorialToDocuments, editableDocuments } from "./sanity-content.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const files = {};
for (const { file } of Object.values(editableDocuments)) {
  files[file] = JSON.parse(await readFile(resolve(root, `src/data/editorial/${file}`), "utf8"));
}
const documents = editorialToDocuments(files);
const target = resolve(root, "studio/seed.ndjson");
await writeFile(target, `${documents.map((document) => JSON.stringify(document)).join("\n")}\n`);
console.log(`Prepared ${documents.length} Sanity documents in studio/seed.ndjson (gitignored, not imported).`);
console.log("For a NEW, EMPTY dataset only: review before importing. On the existing church dataset, create Meet the Team directly in Studio; do NOT reimport the seed.");
