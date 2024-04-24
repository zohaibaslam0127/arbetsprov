import { test, expect } from '@playwright/test';

test('Assemble and verify quote by dragging words', async ({ page }) => {
  await page.goto('https://daedalus.janniskaranikis.dev/challenges/5-create-a-quote');

  const correctQuote = await page.textContent('text="Correct quote" >> .. >> q');
  if (!correctQuote) {
    throw new Error('Failed to find the correct quote on the page');
  }
  const words = correctQuote.split(/\s+/);

  const dropZone = page.locator('bg-slate-50.mb-6.border.p-2.rounded-xl.flex.flex-wrap.min-w-full.lg\\:min-w-[40rem].min-h-[4rem]');

  for (const word of words) {
    const wordLocator = page.locator(`xpath=//text()[contains(., "Drag from here")]/following::ul[1]//li[@draggable="true"][contains(text(), "${word}")]`);
    
    await wordLocator.dragTo(dropZone);
  }

  const resultMessage = await page.textContent('div:text("That is correct! : ASSERTME")');

  expect(resultMessage).toBe('That is correct! : ASSERTME');
});
