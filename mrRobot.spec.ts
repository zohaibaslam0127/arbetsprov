import { test, expect } from '@playwright/test';

test('Mr. Robot dynamic button interaction test', async ({ page }) => {
    await page.goto('https://daedalus.janniskaranikis.dev/challenges/3-mr-robot');

    let allButtonsGreen = false;

    while (!allButtonsGreen) {
        const redButtons = await page.$$('button.bg-red-400:not(.bg-green-400)');

        for (const button of redButtons) {
            let countText = await button.$eval('div', div => div.textContent);
            let count = parseInt(countText, 10);

            while (count > 0) {
                const freshButton = await page.$(`button.bg-red-400:not(.bg-green-400)`);
                if (freshButton) {
                    await freshButton.click();
                    countText = await freshButton.$eval('div', div => div.textContent);
                    count = parseInt(countText, 10);
                } else {
                    break;
                }
            }
        }

        const greenButtonsCount = await page.$$eval('button.bg-green-400.border-green-700', buttons => buttons.length);
        if (greenButtonsCount === 2) {
            allButtonsGreen = true;
        }
    }

    const hintText = await page.textContent('div:has-text("I want a")');
    const wantedText = await page.textContent('div.border-slate-600 >> text=/I want a/ >> span.font-bold');
    console.log(wantedText);
    const dropdown = await page.$('select');
    await dropdown.selectOption({ label: wantedText });

    const successMessage = await page.textContent('.text-green-600.text-lg');
    expect(successMessage).toContain('Mr. Robot is happy!');
    await expect(page.locator('.text-green-600.text-lg')).toBeVisible();
});
