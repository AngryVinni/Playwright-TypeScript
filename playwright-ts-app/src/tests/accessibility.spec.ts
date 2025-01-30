import { setupNewPage } from './setupNewPage';
import { test, expect, chromium, Page } from '@playwright/test';

test('accessibility page text check ', async ({ page }) => {

    const newPage = await setupNewPage('https://sandbox.mabl.com/');
    const containerSelector = 'div.MuiPaper-root.MuiCard-root.jss16.MuiPaper-elevation1.MuiPaper-rounded';
    await newPage.waitForSelector(containerSelector, { state: 'visible' });
    await newPage.click('text=accessibility');
    const textContainerSelector = '.page-content';

    const expectedTextNames = [
        'Accessibility examples',
        'Insufficient color contrast',
        'Sufficient color contrast',
        'Missing list indicator',
        'Existing list indicator',
        'Unassociated form field label',
        'Associated form field label',
        'Image missing alternative text',
        'Image with alternative text'
    ];

    const text = await newPage.evaluate((selector) => {
        const container = document.querySelector(selector);
        if (container) {
            const textElements = Array.from(container.querySelectorAll('p'));
            return textElements.map(text => ({
                text: text.textContent || ''
            }));
        }
        return [];
    }, textContainerSelector);

    console.log('Found text:', text);
    expect(text.length).toBeGreaterThan(0);

    text.forEach((text, index) => {
        expect(text.text).toBe(expectedTextNames[index]);
        console.log(`Text ${index + 1}: ${text.text}`);
    });

    expect(text.length).toBe(expectedTextNames.length);
    console.log(`Total text verified: ${text.length}`);

    await newPage.context().browser()?.close();
});

test('accessibility page text input check ', async ({ page }) => {
    const newPage = await setupNewPage('https://sandbox.mabl.com/');
    const containerSelector = 'div.MuiPaper-root.MuiCard-root.jss16.MuiPaper-elevation1.MuiPaper-rounded';
    await newPage.waitForSelector(containerSelector, { state: 'visible' });
    await newPage.click('text=accessibility');
    await newPage.fill('input[type="text"]', 'ololo');
    await newPage.fill('input[id="name"]','bloooo')

});