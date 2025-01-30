import { test, expect, chromium, Page, Browser } from '@playwright/test';

let browser: Browser;

test.beforeAll(async () => {
    browser = await chromium.connectOverCDP("http://localhost:9222");
});

test('book podzopnik', async ({ page }) => {
    // Get the first available context or create a new one if none exists
    let context = browser.contexts()[0];
    if (!context) {
        context = await browser.newContext();
    }

    // Open a new tab in the existing browser session
    const newPage = await context.newPage();
    await newPage.goto('https://support-places.accenture.com/places');
    console.log('New tab opened in existing browser session.');
     // Create the locator for the div element
    const locator = newPage.locator('#primary_field_30cb30f597b275501d1af0e3a253af08');
    // Click on the div element
    await locator.click();
    await newPage.waitForTimeout(15000);
     // Locate the input field
     const inputField = newPage.locator('#sp_formfield_start_time');
     await newPage.waitForTimeout(5000);
     // Click on the input field
     await inputField.click();
     await newPage.waitForTimeout(5000);
    //  Select all text and delete
    // await inputField.fill('');
    const date = new Date();
    date.setDate(date.getDate() + 14);
    const formattedDate = date.toISOString().split('T')[0]; // Format to YYYY-MM-DD
    const setTime = '09:30:00';
    const dateTime = `${formattedDate} ${setTime}`;

    // Log the dateTime for visibility
    console.log(`Setting dateTime to: ${dateTime}`);

    // Set the value of the input field
    await inputField.fill(dateTime);
});