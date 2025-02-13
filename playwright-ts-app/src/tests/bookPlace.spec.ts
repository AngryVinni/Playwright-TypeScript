import { test, expect, chromium, Page, Browser } from '@playwright/test';

let browser: Browser;

test.beforeAll(async () => {
    browser = await chromium.connectOverCDP("http://localhost:9222");
});

test('book podzopnik', async ({ page }) => {
    let context = browser.contexts()[0] || await browser.newContext();
    console.log('Context found or created.');
    const newPage = await context.newPage();
    await newPage.goto('https://support-places.accenture.com/places');
    console.log('New tab opened in existing browser session.');
    const locator = newPage.locator('#primary_field_30cb30f597b275501d1af0e3a253af08');
    console.log('Locator created.');
    console.log('Clicked on the 102 place element.');
    await newPage.waitForTimeout(15000); 
    console.log('Waited for 15 seconds.');
    await expect(newPage.locator('#sp_formfield_start_time')).toBeVisible();
    console.log('Input field is visible.');
    const inputField = newPage.locator('#sp_formfield_start_time');
    await inputField.click();
    const date = new Date();
    date.setDate(date.getDate() + 14);
    const formattedDate = date.toISOString().split('T')[0];
    const setTime = '09:30:00';
    const startDateTime = `${formattedDate} ${setTime}`;
    console.log(`Setting dateTime to: ${startDateTime}`);
    await inputField.fill(''); 
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
    await newPage.waitForTimeout(1000);
    console.log('Waited for 5 seconds');
    const dateEnd = new Date();
    dateEnd.setDate(dateEnd.getDate() + 14);
    const formattedDateEnd = dateEnd.toISOString().split('T')[0]; 
    const setEndTime = '17:30:00';
    const endDateTime = `${formattedDateEnd} ${setEndTime}`;
    console.log(`Setting dateTime to: ${endDateTime}`);
    await inputFieldEnd.fill(''); 
    await inputFieldEnd.fill(endDateTime); 
    console.log('Filled end time');
    await buttonSearch.click();
    console.log('Clicked on search button');
    await newPage.waitForTimeout(1000);
    const reserveButton = newPage.locator('#reserveBtn');
    console.log('Reserve button found');    
    await reserveButton.click();
    console.log('Reserve button clicked');
    await newPage.waitForTimeout(5000);
    const checkboxselectorfirst = '#reservation-sensitivity';
    await newPage.check(checkboxselectorfirst);
    console.log('first Checkbox checked');
    const checkboxselectorsecond = '#make-space-private';
    await newPage.check(checkboxselectorsecond);
    console.log('second Checkbox checked');
    const dropdownSelector = 'a.select2-choice.select2-default';
    await newPage.click(dropdownSelector);
    await newPage.waitForSelector('span.reservable-type-option', { state: 'visible' });
    const optionSelector = 'span[title="Business Development"]'; 
    await newPage.click(optionSelector);
    const submitReserveButton = newPage.locator('#submitReservation');
    await submitReserveButton.click();
    console.log('Submit button clicked');

});
