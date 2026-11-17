/// <reference types="node" />
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { Site } from "./App";
import { pageInfo } from "./pages";
const template = await readFile("dist/index.html", "utf8");
function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
for (const [path, page] of Object.entries({
  ...pageInfo,
  "/contact": pageInfo["/connect"],
})) {
  const html = renderToString(
    <StaticRouter location={path}>
      <Site />
    </StaticRouter>,
  );
  const output = template
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replace(
      /<title>.*?<\/title>/,
      `<title>${escapeHtml(page.title)} | Garden Community Fellowship</title>`,
    )
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*/,
      `$1${escapeHtml(page.description)}`,
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*/,
      `$1${escapeHtml(page.title)} | Garden Community Fellowship`,
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*/,
      `$1${escapeHtml(page.description)}`,
    );
  const directory = path === "/" ? "dist" : `dist${path}`;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/index.html`, output);
  if (path !== "/") await writeFile(`dist${path}.html`, output);
}
console.log("Prerendered all public routes and contact compatibility page.");
