import { test, expect } from '@playwright/test';

test('Intercept API call and verify data', async ({ page }) => {
  await page.route('**/api/users', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { "name": "Richard", "age": 40 },
        { "name": "Dinesh", "age": 33 },
        { "name": "Gilfoyle", "age": 35 },
        { "name": "Bighead", "age": 29 },
        { "name": "Jared", "age": 31 }
      ])
    });
  });

  await page.goto('https://daedalus.janniskaranikis.dev/challenges/4-bad-data');

  const data = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.user')).map(user => {
      const name = user.querySelector('.name').textContent.trim();
      const age = parseInt(user.querySelector('.age').textContent.trim());
      return { name, age };
    });
  });

   const isTextPresent = await page.$eval('.text-green-600.text-lg', element => {
    return element.textContent.includes('Good job! Your assert code: ASSERTME');
  });

  expect(isTextPresent).toBeTruthy();
});
