import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("all six pages load directly with accessible content and no browser errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const path of [
    "/",
    "/about",
    "/ministries",
    "/events",
    "/watch",
    "/contact",
  ]) {
    await page.goto(path);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page).toHaveTitle(/Garden Community Fellowship/);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
      `${path} accessibility`,
    ).toEqual([]);
  }
  expect(errors).toEqual([]);
});

test("mobile navigation opens, routes, and closes without horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();
  await expect(
    page.getByRole("button", { name: "Close navigation" }),
  ).toHaveAttribute("aria-expanded", "true");
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Ministries", exact: true })
    .click();
  await expect(page).toHaveURL(/ministries/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await page.getByText("More information", { exact: true }).first().click();
  await expect(
    page.locator("#sprouts").getByText(/Schedules, age groups/),
  ).toBeVisible();
  for (const width of [360, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/",
      "/about",
      "/ministries",
      "/events",
      "/watch",
      "/contact",
    ]) {
      await page.goto(path);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${path} at ${width}px`,
      ).toBe(true);
    }
  }
});

test("gathering times and official contact and channel links are correct", async ({
  page,
}) => {
  await page.goto("/events");
  const events = page.locator(".event-row");
  await expect(events).toHaveCount(3);
  await expect(events.filter({ hasText: "Connect Café" })).toContainText(
    "6 PM",
  );
  await expect(events.filter({ hasText: "Cross Talk Café" })).toContainText(
    "6:15 PM",
  );
  await expect(events.filter({ hasText: "Celebrate Recovery" })).toContainText(
    "7 PM",
  );
  await page.goto("/watch");
  await expect(
    page.getByRole("link", { name: /Open YouTube/ }),
  ).toHaveAttribute(
    "href",
    "https://www.youtube.com/@gardencommunityfellowshipg7681",
  );
  await expect(page.getByRole("link", { name: /Open Twitch/ })).toHaveAttribute(
    "href",
    "https://www.twitch.tv/rootedgcf",
  );
  await page.goto("/contact");
  await expect(page.getByRole("link", { name: /Write to us/ })).toHaveAttribute(
    "href",
    "mailto:gcf.online.studios@gmail.com",
  );
  await page.screenshot({
    path: "/tmp/gcf-contact-mobile.png",
    fullPage: true,
  });
});
