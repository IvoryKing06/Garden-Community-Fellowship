import { test } from "node:test";
import assert from "node:assert/strict";
import { documentsToEditorial, editorialToDocuments, editableDocuments } from "./sanity-content.mjs";
import { validateImage } from "./validate-content.mjs";

const seed = Object.entries(editableDocuments).map(([type, cfg]) => ({
  _id: type,
  _type: type,
  ...Object.fromEntries(cfg.keys.map((key) => [key, []])),
}));

test("Sanity requires the five existing published singleton documents before sync", () => {
  assert.throws(() => documentsToEditorial(seed.slice(1)), /Missing required published Sanity document/);
  assert.throws(() => documentsToEditorial([...seed, seed[0]]), /duplicate Sanity document/);
});

test("team directory is optional until approved, with hidden profiles never exported", () => {
  const base = structuredClone(seed.filter((doc) => doc._id !== "teamPage"));
  assert.deepEqual(documentsToEditorial(base)["team.json"], { team: [] });
  assert.deepEqual(documentsToEditorial([...base, { _id: "teamPage", _type: "teamPage" }])["team.json"], { team: [] });
  const team = structuredClone(seed.find((doc) => doc._id === "teamPage"));
  team.team.push({ id: "hidden-person", name: "Hidden", role: "Deacon", group: "Deacons", visibleOnWebsite: false });
  team.team.push({ id: "approved-person", name: "Approved Person", role: "Deacon", group: "Deacons", visibleOnWebsite: true });
  const profiles = documentsToEditorial([...base, team])["team.json"].team;
  assert.equal(profiles.length, 1);
  assert.equal(profiles[0].name, "Approved Person");
  assert.equal(profiles[0].id, "approved-person");
});

test("closed Step Study seed entry cannot reappear on the public events page", () => {
  const docs = structuredClone(seed);
  const gatherings = docs.find((doc) => doc._id === "gatheringsPage");
  gatherings.gatherings.push({ id: "step-study", title: "Retired closed meeting" });
  gatherings.gatherings.push({ id: "new-public-event", title: "Approved public event" });
  const events = documentsToEditorial(docs)["gatherings.json"].gatherings;
  assert.deepEqual(events.map((event) => event.id), ["new-public-event"]);
});

test("editor keys remain stable, even if Sanity generates a non-slug key", () => {
  const docs = structuredClone(seed);
  docs[0].announcements.push({ id: "Welcome_X.y", title: "Welcome", body: "See you Sunday" });
  const first = documentsToEditorial(docs)["announcements.json"].announcements[0];
  const second = documentsToEditorial(docs)["announcements.json"].announcements[0];
  assert.match(first.id, /^entry-[a-f0-9]{16}$/);
  assert.equal(first.id, second.id);
  assert.equal(first.title, "Welcome");
  assert.equal(first._key, undefined);
});

test("existing website ids round-trip into Sanity keys", () => {
  const files = Object.fromEntries(Object.values(editableDocuments).map((cfg) => [
    cfg.file, Object.fromEntries(cfg.keys.map((key) => [key, []])),
  ]));
  files["ministries.json"].ministries.push({ id: "sprouts", name: "Sprouts", category: "Children", description: "Children's ministry", symbol: "01" });
  const docs = editorialToDocuments(files);
  assert.equal(docs.find((doc) => doc._id === "ministriesPage").ministries[0]._key, "sprouts");
  const projection = docs.map((doc) => ({
    ...doc,
    ...Object.fromEntries(Object.entries(doc).filter(([field]) => Array.isArray(doc[field])).map(([field, items]) => [field, items.map((item) => ({ ...item, id: item._key }))])),
  }));
  assert.equal(documentsToEditorial(projection)["ministries.json"].ministries[0].id, "sprouts");
});

test("trusted Sanity image links require accessible descriptions and capped file sizes", () => {
  const image = { src: "https://cdn.sanity.io/images/abc123/production/photo-123.jpg", alt: "Community garden", width: 800, height: 600, bytes: 320_000 };
  assert.doesNotThrow(() => validateImage(image, "image"));
  assert.throws(() => validateImage({ ...image, bytes: 4_000_000 }, "image"), /3 MB/);
  assert.throws(() => validateImage({ ...image, alt: "" }, "image"), /alt/);
  assert.throws(() => validateImage({ ...image, src: "https://cdn.sanity.io/images/abc123/production/../fake.jpg" }, "image"), /trusted Sanity CDN/);
});
