import { setupNewPage } from './setupNewPage';
import { test, expect, chromium, Page } from '@playwright/test';

test('MFA auth', async ({ page }) => {
    const newPage = await setupNewPage('https://sandbox.mabl.com/');
    const containerSelector = 'div.MuiPaper-root.MuiCard-root.jss16.MuiPaper-elevation1.MuiPaper-rounded';
    await newPage.waitForSelector(containerSelector, { state: 'visible' });
    await newPage.click('text=authenticator MFA');





    await newPage.context().browser()?.close();
});