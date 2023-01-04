/* eslint-disable @typescript-eslint/no-magic-numbers */
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import type { Browser, ElementHandle, Page } from 'puppeteer';
import { launch } from 'puppeteer';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  comparisonMethod: 'pixelmatch',
  failureThreshold: 0.02,
  failureThresholdType: 'percent'
});

expect.extend({
  toMatchImageSnapshot
});

const waitForTransition = async (): Promise<void> =>
  new Promise(r => {
    setTimeout(r, 300);
  });

describe.skipIf(!process.env.CI)('update snapshots', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await launch();
    page = await browser.newPage();
    await page.setViewport({ width: 1430, height: 1180 });

    await page.goto('http://localhost:5173/drg-editor/', {
      waitUntil: 'networkidle2'
    });
  });

  it('Update homepage snapshot', async () => {
    const image = await page.screenshot();

    await page.waitForNetworkIdle({ idleTime: 1000 });
    await waitForTransition();
    expect(image).toMatchImageSnapshot();
  });

  it('Update resources snapshot', async () => {
    const fileInput = (await page.$(
      'input[type=file]'
    )) as ElementHandle<HTMLInputElement>;

    await fileInput.uploadFile('src/__tests__/fixtures/with_overclocks.sav');
    await page.waitForSelector('ul.menu');
    await page.waitForNetworkIdle({ idleTime: 1000 });
    await waitForTransition();
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });

  it('Update season snapshot', async () => {
    await page.click('li:nth-child(2)');
    await page.click('.block:nth-child(1) button');

    await page.waitForNetworkIdle({ idleTime: 1000 });
    await waitForTransition();
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });

  it('Update dwarf snapshot', async () => {
    await page.click('li:nth-child(3)');

    await page.waitForNetworkIdle({ idleTime: 1000 });
    await waitForTransition();
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });

  afterAll(async () => {
    await browser.close();
  });
});
