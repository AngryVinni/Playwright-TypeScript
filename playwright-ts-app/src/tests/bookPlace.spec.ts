import { test, expect, chromium, Page, Browser } from '@playwright/test';

let browser: Browser;

test.beforeAll(async () => {
    browser = await chromium.connectOverCDP("http://localhost:9222");
});

test('book podzopnik', async ({ page }) => {
    // Get the first available context or create a new one if none exists
    let context = browser.contexts()[0] || await browser.newContext();
    console.log('Context found or created.');

    // Open a new tab in the existing browser session
    const newPage = await context.newPage();
    await newPage.goto('https://support-places.accenture.com/places');
    console.log('New tab opened in existing browser session.');
    
    // Create the locator for the div element
    const locator = newPage.locator('#primary_field_30cb30f597b275501d1af0e3a253af08');
    console.log('Locator created.');
    await locator.click(); // Click on the div element
    console.log('Clicked on the 102 place element.');

    // Introduce delay using waitTimeout for 15 seconds
    await newPage.waitForTimeout(15000); 
    console.log('Waited for 15 seconds.');
    await expect(newPage.locator('#sp_formfield_start_time')).toBeVisible();
    console.log('Input field is visible.');
    // Locate and interact with the input field
    const inputField = newPage.locator('#sp_formfield_start_time');
    await inputField.click();
  
    // Introducing short delay to ensure interactions are smooth
    // await newPage.waitForTimeout(5000);
  
    // Calculate the date 14 days from today
    const date = new Date();
    date.setDate(date.getDate() + 14);
    const formattedDate = date.toISOString().split('T')[0]; // Format to YYYY-MM-DD
    const setTime = '09:30:00';
    const startDateTime = `${formattedDate} ${setTime}`;

    // Log the dateTime for visibility
    console.log(`Setting dateTime to: ${startDateTime}`);

    // Set the value in the input field
    await inputField.fill(''); // Clear existing value
    await inputField.fill(startDateTime);

    const buttonSearch = newPage.locator('#searchHandlerButton');
    await buttonSearch.click();
    await newPage.waitForTimeout(1000);
    await buttonSearch.click();
    console.log('Button clicked.'); 
    await newPage.waitForTimeout(5000);
    console.log('Set end time');
    const inputFieldEnd = newPage.locator('#sp_formfield_end_time');
    console.log('Locator found');
    await inputFieldEnd.click();
    console.log('Clicked on input field');
  
    // Introducing short delay to ensure interactions are smooth
    await newPage.waitForTimeout(1000);
    console.log('Waited for 5 seconds');
  
    // Calculate the date 14 days from today
    const dateEnd = new Date();
    dateEnd.setDate(dateEnd.getDate() + 14);
    const formattedDateEnd = dateEnd.toISOString().split('T')[0]; // Format to YYYY-MM-DD
    const setEndTime = '17:30:00';
    const endDateTime = `${formattedDateEnd} ${setEndTime}`;

    // Log the dateTime for visibility
    console.log(`Setting dateTime to: ${endDateTime}`);

    // Set the value in the input field
    await inputFieldEnd.fill(''); // Clear existing value
    await inputFieldEnd.fill(endDateTime); // Fill desired date and time value
    console.log('Filled end time');
    // Additional actions or assertions can be added here
    await buttonSearch.click();
    console.log('Clicked on search button');
    await newPage.waitForTimeout(1000);
    await buttonSearch.click();
    console.log('Clicked on search button');
    await newPage.waitForTimeout(1000);
    const reserveButton = newPage.locator('#reserveBtn');
    console.log('Reserve button found');    
    await reserveButton.click();
    console.log('Reserve button clicked');
    await newPage.waitForTimeout(5000);
});
