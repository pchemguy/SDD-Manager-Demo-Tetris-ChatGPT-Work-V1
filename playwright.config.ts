/** Chromium checks against development fixtures and built static production content. */
import { defineConfig } from '@playwright/test';
import { browserLaunchOptions } from './tests/support/browser-runtime';

export default defineConfig({
  testDir: 'tests/browser',
  workers: 1,
  use: { baseURL: 'http://127.0.0.1:5173', headless: true, viewport: { width: 800, height: 600 }, launchOptions: await browserLaunchOptions() },
  webServer: [
    { command: 'npm run dev -- --port 5173 --strictPort', url: 'http://127.0.0.1:5173', reuseExistingServer: false },
    { command: 'npm run build && npm run preview -- --port 4173 --strictPort', url: 'http://127.0.0.1:4173', reuseExistingServer: false },
  ],
});
