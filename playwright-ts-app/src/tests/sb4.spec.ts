import { test, expect, chromium, Page } from '@playwright/test';
import { setupNewPage } from './setupNewPage';

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