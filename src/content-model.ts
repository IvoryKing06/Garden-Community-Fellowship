// Phase 2 CMS contract. Null is an unconfirmed value, never a fabricated destination.
export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Sanity CDN asset byte size, supplied by the content API. */
  bytes?: number;
}
export interface Ministry {
  id: string;
  name: string;
  category: string;
  description: string;
  symbol: string;
  schedule?: string | null;
  image?: ImageAsset | null;
}
export interface Gathering {
  id: string;
  title: string;
  day: string;
  time: string;
  description: string;
  category: string;
  /** Supported display values: weekly, monthly, unconfirmed. */
  recurrence: string;
  date?: string | null;
  location?: string | null;
  image?: ImageAsset | null;
}
export interface Announcement {
  id: string;
  title: string;
  body: string;
  expiresAt?: string | null;
}
export interface Sermon {
  id: string;
  title: string;
  recordedOn: string | null;
  youtubeUrl: string;
  image?: ImageAsset | null;
}
export interface Opportunity {
  id: string;
  title: string;
  description: string;
  schedule: string | null;
}
export interface SiteContent {
  church: { name: string; email: string; youtube: string; twitch: string; phone: string; mailingAddress: string; motto: string };
  scheduleNotes: { id: string; title: string; description: string }[];
  beliefs: { statement: string[]; articles: { id: string; title: string; paragraphs: string[] }[] };
  ministries: Ministry[];
  gatherings: Gathering[];
  announcements: Announcement[];
  sermons: Sermon[];
  bibleStudies: Opportunity[];
  outreach: Opportunity[];
  volunteerOpportunities: Opportunity[];
  visit: {
    address: string | null;
    sundayServiceTime: string | null;
    accessibility: string | null;
  };
  branding: { banner: ImageAsset | null; bannerAlt: string };
  connections: {
    id: string;
    name: string;
    url: string | null;
    status: string;
  }[];
}
export function youtubeRecordingUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return null;
    if (
      ["youtube.com", "www.youtube.com"].includes(parsed.hostname) &&
      parsed.pathname === "/watch" &&
      /^[\w-]{11}$/.test(parsed.searchParams.get("v") ?? "")
    )
      return parsed.href;
    if (parsed.hostname === "youtu.be" && /^\/[\w-]{11}$/.test(parsed.pathname))
      return parsed.href;
  } catch {
    /* Invalid URLs are never rendered as links. */
  }
  return null;
}
