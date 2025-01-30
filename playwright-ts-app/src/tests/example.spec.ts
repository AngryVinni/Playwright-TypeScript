import { setupNewPage } from './setupNewPage';
import { test, expect, chromium, Page } from '@playwright/test';

test('play with sandbox1', async ({ page }) => {
    const newPage = await setupNewPage('https://sandbox.mabl.com/');
    
    const h3Selector = 'h3.MuiTypography-root.spaced.MuiTypography-h3';
    await newPage.waitForSelector(h3Selector, { state: 'visible' });
    const h3Text = await newPage.$eval(h3Selector, (el: HTMLElement) => el.textContent);    
    expect(h3Text).toBe('Welcome to the mabl sandbox!');
    console.log("----sandbox1---->");
    console.log(h3Text);
});
test('play with sandbox2', async ({ page }) => {
    const newPage = await setupNewPage('https://sandbox.mabl.com/');
    const pSelector = 'p.MuiTypography-root.MuiTypography-body1';
    await newPage.waitForSelector(pSelector, { state: 'visible' });
    const pText = await newPage.$$eval(pSelector , (elements: HTMLParagraphElement[]) => elements.map(el => el.textContent));
    
    pText.forEach((pText: string | null) => {
        if (pText !== null) {
            console.log("-----sandbox2--->");
            console.log(pText);
        }
    });
    const expectedValues = ['Use this site to practice creating tests using the mabl trainer.',
         'Use this site to practice creating tests using the mabl trainer.'];
    expectedValues.forEach(value => {
        expect(pText).toContain(value);
    });
});

test('play witht sandbox3', async ({ page }) => {
    const newPage = await setupNewPage('https://sandbox.mabl.com/');
    const h5Selector = 'h5.MuiTypography-root.MuiTypography-h5.MuiTypography-gutterBottom';
    await newPage.waitForSelector(h5Selector, { state: 'visible' });
    const h5Text = await newPage.$eval(h5Selector, (el: HTMLElement) => el.textContent);
    expect(h5Text).toBe('Sample components');
    console.log("----sandbox3---->");    
    console.log(h5Text);
});
test('play with sandbox4', async ({ page }) => {
    const newPage = await setupNewPage('https://sandbox.mabl.com/');
    
    // Wait for container and get button information
    const containerSelector = '.MuiPaper-root.MuiCard-root.jss16.MuiPaper-elevation1.MuiPaper-rounded';
    await newPage.waitForSelector(containerSelector);

    const expectedButtonNames = [
        'authenticator MFA',
        'accessibility',
        'alert',
        'downloads and pdfs',
        'drag and drop',
        'dropdowns',
        'file upload',
        'iframes',
        'looping',
        'mailbox',
        'modal with iframe',
        'modal',
        'new tab',
        'new window',
        'radio buttons',
        'simulated login',
        'simulated MFA login',
        'toast',
        'shadow DOM'
    ];

    const buttons = await newPage.evaluate((selector) => {
        const container = document.querySelector(selector);
        if (container) {
            const anchorElements = Array.from(container.querySelectorAll('a'));
            return anchorElements.map(anchor => ({
                text: anchor.querySelector('.MuiButton-label')?.textContent || '',
                href: anchor.getAttribute('href') || ''
            }));
        }
        return [];
    }, containerSelector);

    // Verify and log results
    console.log('Found buttons:', buttons);
    expect(buttons.length).toBeGreaterThan(0);
    
    // Verify button names
    buttons.forEach((button, index) => {
        expect(button.text).toBe(expectedButtonNames[index]);
        console.log(`Verified button ${index + 1}: ${button.text} ✓`);
    });

    // Verify total number of buttons
    expect(buttons.length).toBe(expectedButtonNames.length);
    console.log(`Total buttons verified: ${buttons.length}`);

    await newPage.context().browser()?.close();
});