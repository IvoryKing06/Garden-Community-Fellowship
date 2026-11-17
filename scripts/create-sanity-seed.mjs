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
console.log("Prepared five Sanity documents in studio/seed.ndjson (gitignored, not imported).");
console.log("After creating an EMPTY Sanity dataset, review this file before running the documented one-time import.");
