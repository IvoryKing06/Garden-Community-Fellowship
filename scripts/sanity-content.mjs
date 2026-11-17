import { createHash } from "node:crypto";

// Sanity's array _key is permanent across reordering, so links remain stable.
const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const stableId = (key) => {
  if (typeof key !== "string" || !key) throw new Error("Sanity item has no stable _key");
  return slug.test(key) ? key : `entry-${createHash("sha256").update(key).digest("hex").slice(0, 16)}`;
};

export const editableDocuments = Object.freeze({
  announcementsPage: { file: "announcements.json", keys: ["announcements"] },
  gatheringsPage: { file: "gatherings.json", keys: ["gatherings"] },
  ministriesPage: { file: "ministries.json", keys: ["ministries"] },
  // Optional until the church publishes its first approved team directory.
  teamPage: { file: "team.json", keys: ["team"], optional: true },
  sermonsPage: { file: "sermons.json", keys: ["sermons"] },
  participationPage: { file: "participation.json", keys: ["bibleStudies", "outreach", "volunteerOpportunities"] },
});

export const sanityQuery = `*[_id in ["announcementsPage", "gatheringsPage", "ministriesPage", "sermonsPage", "participationPage", "teamPage"]]{
  _id,
  _type,
  announcements[]{..., "id": _key},
  gatherings[]{..., "id": _key, "image": select(defined(image.asset) => {
    "src": image.asset->url, "alt": image.alt, "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height, "bytes": image.asset->size
  }, null)},
  ministries[]{..., "id": _key, "image": select(defined(image.asset) => {
    "src": image.asset->url, "alt": image.alt, "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height, "bytes": image.asset->size
  }, null)},
  team[]{..., "id": _key, "image": select(defined(image.asset) => {
    "src": image.asset->url, "alt": image.alt, "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height, "bytes": image.asset->size
  }, null)},
  sermons[]{..., "id": _key, "image": select(defined(image.asset) => {
    "src": image.asset->url, "alt": image.alt, "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height, "bytes": image.asset->size
  }, null)},
  bibleStudies[]{..., "id": _key},
  outreach[]{..., "id": _key},
  volunteerOpportunities[]{..., "id": _key}
}`;

const fields = {
  announcements: ["title", "body", "expiresAt"],
  gatherings: ["title", "day", "time", "description", "category", "recurrence", "date", "location", "image"],
  ministries: ["name", "category", "description", "symbol", "schedule", "image"],
  team: ["name", "role", "group", "bio", "image", "visibleOnWebsite"],
  sermons: ["title", "recordedOn", "youtubeUrl", "image"],
  bibleStudies: ["title", "description", "schedule"],
  outreach: ["title", "description", "schedule"],
  volunteerOpportunities: ["title", "description", "schedule"],
};

export function documentsToEditorial(documents) {
  if (!Array.isArray(documents)) throw new Error("Sanity did not return documents");
  const byId = new Map();
  for (const doc of documents) {
    if (!Object.hasOwn(editableDocuments, doc?._id) || doc?._id !== doc?._type || byId.has(doc._id)) {
      throw new Error("Unexpected or duplicate Sanity document");
    }
    byId.set(doc._id, doc);
  }
  const output = {};
  for (const [type, config] of Object.entries(editableDocuments)) {
    const document = byId.get(type);
    if (!document) {
      if (config.optional) {
        output[config.file] = Object.fromEntries(config.keys.map((key) => [key, []]));
        continue;
      }
      throw new Error(`Missing required published Sanity document: ${type}`);
    }
    const mapped = {};
    for (const key of config.keys) {
      if (config.optional && document[key] == null) {
        // Sanity may omit the array field on a newly published, still-empty team page.
        mapped[key] = [];
        continue;
      }
      if (!Array.isArray(document[key])) throw new Error(`Sanity ${type}.${key} must be an array`);
      // A profile requires explicit staff approval before it can reach the public build.
      mapped[key] = document[key].filter((item) => {
        if (key === "team") return item?.visibleOnWebsite === true;
        // This former closed meeting was imported with the initial seed. Keep its
        // retired ID off the public site until staff remove it from live Sanity.
        if (key === "gatherings") return item?.id !== "step-study";
        return true;
      }).map((item) => {
        if (!item || typeof item !== "object") throw new Error(`Invalid Sanity item in ${key}`);
        const result = { id: stableId(item.id) };
        for (const field of fields[key]) {
          if (item[field] !== undefined && item[field] !== null) result[field] = item[field];
        }
        if (key === "sermons" && result.recordedOn === undefined) result.recordedOn = null;
        if (["bibleStudies", "outreach", "volunteerOpportunities"].includes(key) && result.schedule === undefined) result.schedule = null;
        return result;
      });
    }
    output[config.file] = mapped;
  }
  return output;
}

export function editorialToDocuments(files) {
  const documents = [];
  const documentArrayTypes = {
    announcements: "announcement", gatherings: "gathering", ministries: "ministry", team: "teamMember", sermons: "sermon",
    bibleStudies: "opportunity", outreach: "opportunity", volunteerOpportunities: "opportunity",
  };
  for (const [type, config] of Object.entries(editableDocuments)) {
    const content = files[config.file];
    const document = { _id: type, _type: type };
    for (const key of config.keys) {
      document[key] = content[key].map(({ id, ...value }) => {
        if (value.image) throw new Error(`Seed import does not yet support pre-existing images in ${key}`);
        return { _key: id, _type: documentArrayTypes[key], ...value };
      });
    }
    documents.push(document);
  }
  return documents;
}
