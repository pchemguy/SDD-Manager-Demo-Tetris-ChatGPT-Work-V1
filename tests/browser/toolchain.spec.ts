/** Verify real Chromium can load and execute the repository's TypeScript entry. */
import { test, expect } from '@playwright/test';

test('executes the development entry point in Chromium', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Browser Tetris');
  await expect(page.locator('#status')).toContainText('Toolchain ready');
});
