import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

// The project ID is public configuration, not a secret or an admin credential.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "gs8p6s6x";

export default defineConfig({
  name: "garden-community-fellowship",
  title: "The Garden · Website Administration",
  projectId,
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  // Register the fixed document IDs before Structure Tool renders them.
  // Sanity's default structure handles these singleton entries automatically.
  document: {
    singletons: [
      "announcementsPage",
      "gatheringsPage",
      "ministriesPage",
      "sermonsPage",
      "participationPage",
    ],
  },
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
