import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("all required pages load directly with accessible content and no browser errors", async ({
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
    "/connect",
    "/plan-your-visit",
    "/get-involved",
    "/sermons",
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
    .locator("summary")
    .filter({ hasText: "Ministries" })
    .click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Ministries & Bible Studies", exact: true })
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
      "/connect",
      "/plan-your-visit",
      "/get-involved",
      "/sermons",
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
  await expect(events).toHaveCount(10);
  for (const [title, time] of [
    ["Prayer", "8:00–8:40 AM"],
    ["Adult Sunday School", "8:45–9:45 AM"],
    ["Sunday Service", "10:00 AM–12:00 PM"],
    ["Celebrate Recovery", "7:00–9:00 PM"],
    ["Men’s Bible Study", "6:00–8:00 PM"],
    ["Co-Ed Bible Study", "5:00–7:00 PM"],
    ["Women’s Bible Stories", "6:00–8:00 PM"],
    ["Night of Praise and Worship", "6:00–8:00 PM"],
    ["Communion and Potluck Meal", "Time to be confirmed"],
    ["Celebrate Recovery Step Study", "4:00–6:00 PM"],
  ]) {
    await expect(
      events.filter({
        has: page.getByRole("heading", { name: title, exact: true }),
      }),
    ).toContainText(time);
  }
  await expect(events.filter({ hasText: "Night of Praise" })).toContainText(
    "MONTHLY",
  );
  await expect(events.filter({ hasText: "Step Study" })).toContainText(
    "recurrence to be confirmed",
  );
  await expect(page.getByRole("complementary")).toContainText("café");
  await expect(events.filter({ hasText: "Café" })).toHaveCount(0);
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

test("pending destinations and forms remain honest; media stays external", async ({
  page,
}) => {
  await page.goto("/connect");
  await expect(page.locator("body")).not.toContainText(
    /facebook|olive branches|\boaks\b/i,
  );
  const spotify = page
    .locator(".connection-list li")
    .filter({ hasText: "Spotify podcast" });
  await expect(spotify).toContainText(/pending/);
  await expect(spotify.locator("a")).toHaveCount(0);
  await expect(
    page.locator(".connection-list").getByRole("link", { name: /Donations/ }),
  ).toHaveAttribute(
    "href",
    "https://forms.ministryforms.net/viewForm.aspx?formId=1b5ad390-6ef4-402f-868a-594e21f48402&app-redirect=&source=20",
  );
  const discord = page
    .locator(".connection-list")
    .getByRole("link", { name: /Discord/ });
  await expect(discord).toHaveAttribute("href", "https://discord.gg/xsTmy9rEA");
  await expect(discord).toHaveAttribute("target", "_blank");
  await expect(discord).toHaveAttribute("rel", "noopener noreferrer");
  await page.goto("/get-involved");
  await expect(page.locator("form")).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "Email your interest" }),
  ).toHaveAttribute("href", /mailto:gcf.online.studios@gmail.com/);
  for (const route of ["/sermons", "/watch"]) {
    await page.goto(route);
    await expect(page.locator("iframe, video")).toHaveCount(0);
  }
  await page.goto("/sermons");
  await expect(
    page.getByText(/Individual recording links, titles, and dates are pending/),
  ).toBeVisible();
  await page.goto("/contact");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Let’s start a conversation.",
  );
});

test("static HTML contains route-specific content before JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const [route, title] of [
    ["/about", "About Us"],
    ["/plan-your-visit", "Plan Your Visit"],
    ["/sermons", "Sermons"],
    ["/get-involved", "Get Involved"],
    ["/connect", "Connect"],
  ]) {
    await page.goto("http://127.0.0.1:4173" + route);
    await expect(page).toHaveTitle(title + " | Garden Community Fellowship");
    await expect(page.locator("h1")).toBeVisible();
  }
  await context.close();
});

test("pastor beliefs, official banner and inquiry addresses remain intact", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("navigation")
    .locator("summary")
    .filter({ hasText: "About" })
    .click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "What We Believe", exact: true })
    .click();
  await expect(page).toHaveURL(/about#what-we-believe/);
  await expect(
    page.getByRole("heading", { name: "What We Believe", exact: true }),
  ).toBeInViewport();
  await page.goto("/about");
  await expect(page.locator(".faith-statement p")).toHaveCount(9);
  await expect(page.locator(".faith-article")).toHaveCount(19);
  await expect(page.locator(".faith-statement")).toContainText(
    "Every human life is valuable",
  );
  const article = page
    .locator(".faith-article")
    .filter({ has: page.locator("summary", { hasText: "The Sacraments" }) });
  await article.locator("summary").click();
  await expect(article).toContainText(
    "The sacraments are not a means of salvation.",
  );
  await expect(article.getByText(/Matt. 26:26-28/)).toBeVisible();
  for (const route of [
    "/",
    "/about",
    "/events",
    "/ministries",
    "/plan-your-visit",
    "/connect",
    "/get-involved",
  ]) {
    await page.goto(route);
    await expect(page.locator("body")).not.toContainText(
      /gardencommunityfellowship@gmail.com|facebook|olive branches|\boaks\b/i,
    );
    for (const link of await page.locator('a[href^="mailto:"]').all()) {
      await expect(link).toHaveAttribute(
        "href",
        /^mailto:gcf\.online\.studios@gmail\.com(?:\?|$)/,
      );
    }
  }
  await page.goto("/");
  const banner = page.locator(".official-banner img");
  await expect(banner).toHaveAttribute("src", "/uploads/gcf-banner.webp");
  expect(
    await banner.evaluate((img: HTMLImageElement) => img.naturalWidth),
  ).toBe(2172);
  await expect(page.locator(".gather-strip")).toContainText(
    "10:00 AM–12:00 PM",
  );
  await expect(page.locator(".gather-strip")).toContainText(
    "2931 Erskine Creek Rd",
  );
});

test("homepage highlights approved content and routes visitors to full details", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText(
    "Welcome toGarden CommunityFellowship",
  );
  for (const title of [
    "Service Times",
    "Our Mission",
    "Our Community",
    "Get Involved",
  ]) {
    await expect(
      page
        .locator(".home-highlights")
        .getByRole("heading", { name: title, exact: true }),
    ).toBeVisible();
  }
  await expect(page.locator(".featured-event")).toHaveCount(3);
  await expect(page.locator(".featured-events")).toContainText(
    "Featured recurring gatherings",
  );
  await expect(page.locator(".home-columns")).not.toContainText(
    /Michigan|Garden City|Sermons in the Park|10:30 AM|Mar 16/i,
  );
  await page.getByRole("link", { name: "From our Articles of Faith" }).click();
  await expect(page.locator("#the-church")).toHaveAttribute("open", "");
  await expect(page.locator("#the-church")).toContainText(
    "The purpose of the church is to make Christ known",
  );
  await page.goto("/");
  await page
    .getByRole("link", { name: "View All Events", exact: true })
    .click();
  await expect(page.locator(".event-row")).toHaveCount(10);
});

test("final polish keeps compact recurring badges and accessible map directions", async ({
  page,
  context,
}) => {
  // Intercept only the external destination so the test verifies link behavior
  // without depending on Google's service or the environment's outbound policy.
  await context.route("https://www.google.com/maps/dir/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<title>Directions destination</title>",
    }),
  );
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator(".welcome-art")).not.toContainText(
      /approved illustrative artwork/i,
    );
    const badges = page.locator(".featured-day");
    await expect(badges).toHaveText(["Monday", "Tuesday", "First Friday"]);
    const sizes = await badges.evaluateAll((nodes) =>
      nodes.map((node) => ({
        height: node.getBoundingClientRect().height,
        fits: node.scrollWidth <= node.clientWidth,
      })),
    );
    expect(
      sizes.every(
        (size) =>
          size.height === sizes[0].height && size.height <= 50 && size.fits,
      ),
    ).toBe(true);
    await expect(page.locator(".featured-events")).toContainText(
      "First Friday of each month",
    );
    await page.goto("/plan-your-visit");
    const directions = page.getByRole("link", { name: /Get Directions/ });
    const address = "2931 Erskine Creek Rd, Lake Isabella, CA 93240";
    const destination = new URL((await directions.getAttribute("href"))!);
    expect(destination.origin + destination.pathname).toBe(
      "https://www.google.com/maps/dir/",
    );
    expect(destination.searchParams.get("api")).toBe("1");
    expect(destination.searchParams.get("destination")).toBe(address);
    await expect(directions).toHaveAttribute("target", "_blank");
    await expect(directions).toHaveAttribute("rel", "noopener noreferrer");
    const popupPromise = page.waitForEvent("popup");
    await directions.click();
    const popup = await popupPromise;
    await popup.waitForLoadState();
    expect(popup.url()).toBe(destination.href);
    await popup.close();
    await expect(
      page.getByRole("link", { name: "Questions about your visit?" }),
    ).toHaveAttribute("href", "mailto:gcf.online.studios@gmail.com");
  }
});

test("capture desktop and mobile review screenshots", async ({ page }) => {
  for (const [device, width, height] of [
    ["desktop", 1440, 1000],
    ["mobile", 390, 844],
  ] as const) {
    await page.setViewportSize({ width, height });
    for (const [name, route] of [
      ["home", "/"],
      ["schedule", "/events"],
      ["beliefs", "/about"],
      ["visit", "/plan-your-visit"],
      ["ministries", "/ministries"],
      ["sermons", "/sermons"],
      ["involved", "/get-involved"],
      ["connect", "/connect"],
      ["watch", "/watch"],
    ]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: `docs/review/phase-1-${name}-${device}.png`,
        fullPage: true,
      });
    }
  }
});
