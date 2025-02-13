import { test, expect, chromium, Page, Browser } from '@playwright/test';

let browser: Browser;

test.beforeAll(async () => {
    browser = await chromium.connectOverCDP("http://localhost:9222");
});

test('book podzopnik', async ({ page }) => {
    let context = browser.contexts()[0];
    if (!context) {
        context = await browser.newContext();
    }
    const newPage = await context.newPage();
    await newPage.goto('https://support-places.accenture.com/places');
    console.log('New tab opened in existing browser session.');
    const locator = newPage.locator('#primary_field_30cb30f597b275501d1af0e3a253af08');
    await locator.click();
    await newPage.waitForTimeout(15000);
     const inputField = newPage.locator('#sp_formfield_start_time');
     await newPage.waitForTimeout(5000);
     await inputField.click();
     await newPage.waitForTimeout(5000);
    const date = new Date();
    date.setDate(date.getDate() + 14);
    const formattedDate = date.toISOString().split('T')[0];
    const setTime = '09:30:00';
    const dateTime = `${formattedDate} ${setTime}`;
    console.log(`Setting dateTime to: ${dateTime}`);
    await inputField.fill(dateTime);
});