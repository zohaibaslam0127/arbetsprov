import { test, expect } from '@playwright/test';

test('Verify button functionality', async ({ page }) => {
  await page.goto('https://daedalus.janniskaranikis.dev/challenges/1-press-the-button');

  await page.click('button:has-text("Press Me")');

  const textAfterButtonClick = await page.textContent('body');
  expect(textAfterButtonClick).toContain('You made it! Your assert code: ASSERTME');
});
