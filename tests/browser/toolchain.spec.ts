/** Verify real Chromium can load and execute the repository's TypeScript entry. */
import { test, expect } from '@playwright/test';

test('executes the development entry point in Chromium', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Browser Tetris');
  await expect(page.locator('#status')).toHaveText('Running');
  // DOM text alone cannot establish the packaged browser can rasterize glyphs.
  const drawsText = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 300; canvas.height = 60;
    const context = canvas.getContext('2d')!;
    context.font = '20px sans-serif'; context.fillText('Browser Tetris', 4, 30);
    return context.getImageData(0, 0, 300, 60).data.some((value, index) => index % 4 === 3 && value > 0);
  });
  expect(drawsText).toBe(true);
});
