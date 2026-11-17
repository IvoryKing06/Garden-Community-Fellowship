import siteData from "./data/site.json";
import announcementData from "./data/editorial/announcements.json";
import sermonData from "./data/editorial/sermons.json";
import ministryData from "./data/editorial/ministries.json";
import gatheringData from "./data/editorial/gatherings.json";
import participationData from "./data/editorial/participation.json";
import type { SiteContent } from "./content-model";
// Approved pastor content is outside the CMS-editable collections.
export const content: SiteContent = {
  ...siteData,
  ...announcementData,
  ...sermonData,
  ...ministryData,
  ...gatheringData,
  ...participationData,
};
export const {
  church,
  beliefs,
  scheduleNotes,
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
