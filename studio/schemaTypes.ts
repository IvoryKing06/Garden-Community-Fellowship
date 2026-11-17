import { defineArrayMember, defineField, defineType } from "sanity";

const photo = defineField({
  name: "image",
  title: "Optional photo",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Describe the image for screen readers",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});

const announcement = defineArrayMember({
  name: "announcement",
  title: "Announcement",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "body", title: "Message", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: "expiresAt", title: "Remove after (optional)", type: "date" }),
  ],
  preview: { select: { title: "title", subtitle: "expiresAt" } },
});

const gathering = defineArrayMember({
  name: "gathering",
  title: "Church event",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "day", title: "Day (for example, Every Monday)", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "time", title: "Time or Pending Confirmation", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", validation: (rule) => rule.required() }),
    defineField({ name: "category", title: "Category", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "recurrence",
      title: "How often?",
      type: "string",
      options: {
        list: [
          { title: "Every week", value: "weekly" },
          { title: "Monthly", value: "monthly" },
          { title: "Not confirmed yet", value: "unconfirmed" },
        ],
        layout: "radio",
      },
      initialValue: "unconfirmed",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "date", title: "Specific date (optional)", type: "date" }),
    defineField({ name: "location", title: "Location (optional)", type: "string" }),
    photo,
  ],
  preview: { select: { title: "title", subtitle: "day" } },
});

const ministry = defineArrayMember({
  name: "ministry",
  title: "Ministry",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Ministry name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "category", title: "Category", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", validation: (rule) => rule.required() }),
    defineField({ name: "symbol", title: "Short display number (for example 01)", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "schedule", title: "Schedule (optional)", type: "string" }),
    photo,
  ],
  preview: { select: { title: "name", subtitle: "category" } },
});

const teamMember = defineArrayMember({
  name: "teamMember",
  title: "Team member",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Full name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "role", title: "Church role or title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "group",
      title: "Team group",
      type: "string",
      options: { list: ["Pastoral Leadership", "Deacons", "Ministry Leaders", "Church Staff", "Other"] },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "bio", title: "Short introduction (optional)", type: "text", rows: 4 }),
    photo,
    defineField({
      name: "visibleOnWebsite",
      title: "Show this person on the website",
      description: "Leave off until their name, role, and permission to use their photo have been confirmed.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image", visible: "visibleOnWebsite" },
    prepare({ title, subtitle, media, visible }) {
      return { title: title || "Unnamed team member", subtitle: `${subtitle || "Role pending"} · ${visible ? "Visible" : "Hidden"}`, media };
    },
  },
});

const sermon = defineArrayMember({
  name: "sermon",
  title: "Sermon recording",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Sermon title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "recordedOn", title: "Recording date (optional)", type: "date" }),
    defineField({
      name: "youtubeUrl",
      title: "Link to this individual YouTube recording",
      description: "Use a YouTube watch or youtu.be link, not the church's channel URL.",
      type: "url",
      validation: (rule) => rule.required().custom((value) => {
        if (!value) return true;
        try {
          const u = new URL(value);
          if (u.protocol !== "https:") return "Use HTTPS.";
          const isWatch = ["www.youtube.com", "youtube.com"].includes(u.hostname) && u.pathname === "/watch" && /^[\w-]{11}$/.test(u.searchParams.get("v") ?? "");
          const isShort = u.hostname === "youtu.be" && /^\/[\w-]{11}$/.test(u.pathname);
          return isWatch || isShort || "Use a link to one YouTube recording.";
        } catch {
          return "Enter a valid URL.";
        }
      }),
    }),
    photo,
  ],
  preview: { select: { title: "title", subtitle: "recordedOn" } },
});

const opportunity = defineArrayMember({
  name: "opportunity",
  title: "Bible study or opportunity",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", validation: (rule) => rule.required() }),
    defineField({ name: "schedule", title: "Schedule (optional)", type: "string" }),
  ],
  preview: { select: { title: "title", subtitle: "schedule" } },
});

export const schemaTypes = [
  defineType({
    name: "announcementsPage",
    title: "Announcements",
    type: "document",
    fields: [defineField({ name: "announcements", title: "Announcements", type: "array", of: [announcement] })],
  }),
  defineType({
    name: "gatheringsPage",
    title: "Services & Events",
    type: "document",
    fields: [defineField({ name: "gatherings", title: "Church gatherings", type: "array", of: [gathering] })],
  }),
  defineType({
    name: "ministriesPage",
    title: "Ministries",
    type: "document",
    fields: [defineField({ name: "ministries", title: "Ministries", type: "array", of: [ministry] })],
  }),
  defineType({
    name: "teamPage",
    title: "Meet the Team",
    type: "document",
    fields: [
      defineField({
        name: "team",
        title: "Church leadership and ministry team",
        description: "One place to update staff and ministry leaders. Drag to reorder; enable Show on website for approved profiles.",
        type: "array",
        of: [teamMember],
      }),
    ],
  }),
  defineType({
    name: "sermonsPage",
    title: "Sermons",
    type: "document",
    fields: [defineField({ name: "sermons", title: "Individual sermon recordings", type: "array", of: [sermon] })],
  }),
  defineType({
    name: "participationPage",
    title: "Bible Studies & Involvement",
    type: "document",
    fields: [
      defineField({ name: "bibleStudies", title: "Bible studies", type: "array", of: [opportunity] }),
      defineField({ name: "outreach", title: "Outreach", type: "array", of: [opportunity] }),
      defineField({ name: "volunteerOpportunities", title: "Volunteer opportunities", type: "array", of: [opportunity] }),
    ],
  }),
];
