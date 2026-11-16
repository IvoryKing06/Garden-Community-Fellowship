import data from "./data/site.json";
import type { SiteContent } from "./content-model";
export const content: SiteContent = data;
export const {
  church,
  ministries,
  gatherings,
  announcements,
  sermons,
  bibleStudies,
  outreach,
  volunteerOpportunities,
  visit,
  branding,
  connections,
} = content;
