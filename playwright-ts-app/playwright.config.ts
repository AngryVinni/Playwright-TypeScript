import { defineConfig, PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  use: {
    headless: false, // Disable headless mode to see the UI
    // Other options...
  },
};
export default defineConfig({
  fullyParallel: true,
  testDir: './src/tests',
  timeout: 90000,
  expect: {
    timeout: 10000,
  },
  reporter: 'html',
  use: {
    // headless: true,
    // headless: false,
    browserName: 'chromium',
  },
});