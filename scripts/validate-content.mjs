import { readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve, sep } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const load = (path) => JSON.parse(readFileSync(resolve(root, path), "utf8"));
const required = (value, label) => {
  if (typeof value !== "string" || !value.trim()) throw new Error(`${label} must be a nonempty string`);
};
const optionalDate = (value, label) => {
  if (value == null || value === "") return;
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(`${value}T00:00:00Z`)) || new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) !== value) {
    throw new Error(`${label} must be a valid YYYY-MM-DD date`);
  }
};
export function validateIds(items, label, fields) {
  if (!Array.isArray(items)) throw new Error(`${label} must be an array`);
  const ids = new Set();
  for (const [index, item] of items.entries()) {
    if (!item || typeof item !== "object" || Array.isArray(item)) throw new Error(`${label}[${index}] must be an object`);
    const path = `${label}[${index}]`;
    required(item.id, `${path}.id`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id)) throw new Error(`${path}.id must be a stable lowercase slug`);
    if (ids.has(item.id)) throw new Error(`${label} has duplicate ID ${item.id}`);
    ids.add(item.id);
    for (const field of fields) required(item[field], `${path}.${field}`);
  }
}
export function validateYoutube(url) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" || parsed.username || parsed.password) return false;
    if ((parsed.hostname === "youtube.com" || parsed.hostname === "www.youtube.com") && parsed.pathname === "/watch") {
      return /^[\w-]{11}$/.test(parsed.searchParams.get("v") ?? "");
    }
    return parsed.hostname === "youtu.be" && /^\/[\w-]{11}$/.test(parsed.pathname);
  } catch { return false; }
}
export function validateImage(asset, label) {
  if (asset == null) return;
  if (typeof asset.src === "string" && asset.src.startsWith("https://cdn.sanity.io/images/")) {
    required(asset.alt, label + ".alt");
    if (!Number.isInteger(asset.width) || !Number.isInteger(asset.height) || asset.width < 1 || asset.height < 1 || asset.width > 10000 || asset.height > 10000) {
      throw new Error(label + " requires sensible image dimensions");
    }
    const u = new URL(asset.src);
    if (u.protocol !== "https:" || u.hostname !== "cdn.sanity.io" || u.search || !/^\/images\/[a-z0-9]+\/[a-z0-9-]+\/[a-z0-9-]+\.(?:webp|png|jpe?g)$/i.test(u.pathname)) {
      throw new Error(label + " must reference a trusted Sanity CDN image");
    }
    if (!Number.isInteger(asset.bytes) || asset.bytes < 1 || asset.bytes > 3_000_000) {
      throw new Error(label + " exceeds the 3 MB uploaded-image limit or has missing size metadata");
    }
    return;
  }
  required(asset.src, `${label}.src`);
  required(asset.alt, `${label}.alt`);
  if (!Number.isInteger(asset.width) || !Number.isInteger(asset.height) || asset.width < 1 || asset.height < 1 || asset.width > 10000 || asset.height > 10000) {
    throw new Error(`${label} requires sensible integer width and height`);
  }
  if (!/^\/uploads\/[a-zA-Z0-9][a-zA-Z0-9._-]*\.(?:webp|png|jpe?g)$/i.test(asset.src)) throw new Error(`${label}.src must be a local image in /uploads`);
  const uploads = resolve(root, "public/uploads");
  const file = resolve(uploads, asset.src.slice("/uploads/".length));
  if (!file.startsWith(`${uploads}${sep}`)) throw new Error(`${label} has unsafe image path`);
  const bytes = statSync(file).size;
  if (bytes > 3_000_000) throw new Error(`${label} exceeds the 3 MB image limit`);
}
export function validateContent(data) {
  const { church, beliefs, branding, announcements, sermons, ministries, gatherings, participation } = data;
  required(church.name, "church.name");
  required(church.email, "church.email");
  if (!Array.isArray(beliefs.statement) || beliefs.statement.length !== 9 || !Array.isArray(beliefs.articles) || beliefs.articles.length !== 19) throw new Error("Approved beliefs must retain the 9 statements and 19 articles for pastoral review");
  validateImage(branding.banner, "branding.banner");
  validateIds(announcements.announcements, "announcements", ["title", "body"]);
  for (const item of announcements.announcements) optionalDate(item.expiresAt, `announcement ${item.id} expiry`);
  validateIds(sermons.sermons, "sermons", ["title", "youtubeUrl"]);
  for (const item of sermons.sermons) {
    if (!validateYoutube(item.youtubeUrl)) throw new Error(`sermon ${item.id} must use a verified HTTPS YouTube recording URL`);
    optionalDate(item.recordedOn, `sermon ${item.id} recording date`);
    validateImage(item.image, `sermon ${item.id} image`);
  }
  validateIds(ministries.ministries, "ministries", ["name", "category", "description", "symbol"]);
  for (const item of ministries.ministries) validateImage(item.image, `ministry ${item.id} image`);
  validateIds(gatherings.gatherings, "gatherings", ["title", "day", "time", "description", "category", "recurrence"]);
  for (const item of gatherings.gatherings) {
    if (!["weekly", "monthly", "unconfirmed"].includes(item.recurrence)) throw new Error(`gathering ${item.id} has unsupported recurrence`);
    optionalDate(item.date, `gathering ${item.id} date`);
    validateImage(item.image, `gathering ${item.id} image`);
  }
  for (const key of ["bibleStudies", "outreach", "volunteerOpportunities"]) {
    validateIds(participation[key], key, ["title", "description"]);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    validateContent({
      ...load("src/data/site.json"),
      announcements: load("src/data/editorial/announcements.json"),
      sermons: load("src/data/editorial/sermons.json"),
      ministries: load("src/data/editorial/ministries.json"),
      gatherings: load("src/data/editorial/gatherings.json"),
      participation: load("src/data/editorial/participation.json"),
    });
    console.log("Content schema, links, dates, IDs, and images verified.");
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
