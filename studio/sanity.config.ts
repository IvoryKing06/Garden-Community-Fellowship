import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
if (!projectId) {
  throw new Error("Set SANITY_STUDIO_PROJECT_ID after creating the church's Sanity project.");
}

export default defineConfig({
  name: "garden-community-fellowship",
  title: "The Garden · Website Administration",
  projectId,
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Church Website")
          .singletons([
            "announcementsPage",
            "gatheringsPage",
            "ministriesPage",
            "sermonsPage",
            "participationPage",
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
