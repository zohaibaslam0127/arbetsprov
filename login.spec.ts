import { test, expect } from '@playwright/test';

test('Log in with correct username and password', async ({ page }) => {
  await page.goto('https://daedalus.janniskaranikis.dev/challenges/2-log-in');

  await page.waitForSelector('input[placeholder="Enter your username here"]');

  await page.fill('input[placeholder="Enter your username here"]', 'Admin');
  await page.fill('input[placeholder="Enter your password here"]', 'SafePass123');

  await page.click('button:has-text("Log In")');

  await page.waitForSelector('body:has-text("Good Job! Your well earned assert code: ASSERTME")');

  const successMessageText = await page.textContent('body');
  expect(successMessageText).toContain('Good Job! Your well earned assert code: ASSERTME');
});

test('Log in with incorrect password', async ({ page }) => {
  await page.goto('https://daedalus.janniskaranikis.dev/challenges/2-log-in');

  await page.waitForSelector('input[placeholder="Enter your username here"]');

  await page.fill('input[placeholder="Enter your username here"]', 'Admin');
  await page.fill('input[placeholder="Enter your password here"]', 'IncorrectPassword');

  await page.click('button:has-text("Log In")');

  const errorMessageText = await page.textContent('body');
  expect(errorMessageText).toContain('Error, invalid credentials!');
});

test('Log in with incorrect username', async ({ page }) => {
  await page.goto('https://daedalus.janniskaranikis.dev/challenges/2-log-in');

  await page.waitForSelector('input[placeholder="Enter your username here"]');

  await page.fill('input[placeholder="Enter your username here"]', 'IncorrectUsername');
  await page.fill('input[placeholder="Enter your password here"]', 'SafePass123');

  await page.click('button:has-text("Log In")');

  const errorMessageText = await page.textContent('body');
  expect(errorMessageText).toContain('Error, invalid credentials!');
});

test('Log in with empty fields', async ({ page }) => {
  await page.goto('https://daedalus.janniskaranikis.dev/challenges/2-log-in');

  await page.click('button:has-text("Log In")');

  const errorMessageText = await page.textContent('body');
  expect(errorMessageText).toContain('Error, invalid credentials!');
});
