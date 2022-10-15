import { configureToMatchImageSnapshot } from "jest-image-snapshot";
import type { Browser, ElementHandle, Page } from "puppeteer";
import { launch } from "puppeteer";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  comparisonMethod: "ssim",
  failureThreshold: 0.01,
  failureThresholdType: "percent",
});

expect.extend({
  toMatchImageSnapshot,
});

describe.skipIf(!process.env?.CI)("update snapshots", () => {
  let browser: Browser;
  let page: Page;

  const waitForTransition = async () => new Promise((r) => setTimeout(r, 300));

  beforeAll(async () => {
    browser = await launch();
    page = await browser.newPage();
    page.setViewport({ width: 1430, height: 1180 });

    await page.goto("http://localhost:5173/drg-editor/");
    await page.waitForNetworkIdle();
  });

  it("Update homepage snapshot", async () => {
    const image = await page.screenshot();

    await waitForTransition();
    expect(image).toMatchImageSnapshot();
  });

  it("Update resources snapshot", async () => {
    const fileInput = (await page.$(
      "input[type=file]"
    )) as ElementHandle<HTMLInputElement>;
    if (!fileInput) {
      throw new Error("File input not found");
    }

    await fileInput.uploadFile("src/__tests__/fixtures/with_overclocks.sav");
    await page.waitForSelector("ul.menu");

    await waitForTransition();
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });

  it("Update season snapshot", async () => {
    await page.click("li:nth-child(2)");
    await page.click(".block:nth-child(1) button");

    await waitForTransition();
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });

  it("Update dwarf snapshot", async () => {
    await page.click("li:nth-child(3)");

    await waitForTransition();
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });

  afterAll(async () => {
    await browser.close();
  });
});
