import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "gs8p6s6x",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
});
