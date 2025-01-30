import { setupNewPage } from './setupNewPage';
import { test, expect, chromium, Page } from '@playwright/test';

test('alert page ', async ({ page }) => {

    const newPage = await setupNewPage('https://sandbox.mabl.com/');
    const containerSelector = 'div.MuiPaper-root.MuiCard-root.jss16.MuiPaper-elevation1.MuiPaper-rounded';
    await newPage.waitForSelector(containerSelector, { state: 'visible' });
    await newPage.click('text=alert');
    const h3Locator = newPage.locator('h3.MuiTypography-root.MuiTypography-h3');
    const h3Text = await h3Locator.textContent();
    const isTextPresent = h3Text?.includes('alert examples');
    expect(isTextPresent).toBeTruthy();
    // await newPage.getByText('open alert').hover();
    await newPage.click('text=open alert');
    // await newPage.click('a.MuiButtonBase-root >> text="open alert"')
    // await page.getByText("open alert").click();
    // await newPage.click('button#open alert');



    newPage.on('dialog', async dialog => {
        console.log('Dialog message:', dialog.message());
        await dialog.accept();
    });
    await newPage.click('text=open alert');
await newPage.waitForTimeout(5000);
});
