import { test, expect, chromium, Page } from '@playwright/test';
export async function setupNewPage(url: string): Promise<Page> {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const newPage = await context.newPage();
    await newPage.goto(url);
    return newPage;
}