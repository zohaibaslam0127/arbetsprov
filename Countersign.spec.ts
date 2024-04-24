import { test, expect } from '@playwright/test';

test('submit passcode and verify response', async ({ page }) => {
    await page.goto('https://daedalus.janniskaranikis.dev/challenges/6-countersign');

    const passCodeElement = await page.$('text="Your pass code" >> input');
    if (!passCodeElement) throw new Error('Passcode element not found');
    const passCode: string = await passCodeElement.inputValue();

    const response = await page.request.post('https://daedalus.janniskaranikis.dev/api/getkey', {
        data: { plaintext: passCode }
    });
    const data = await response.json();
    const responseInput = await page.$('text="Your Response" >> input');
    if (!responseInput) throw new Error('Response input not found');
    await responseInput.fill(data.key);


    await page.click('button:has-text("Submit")');
    await page.click('button:has-text("Submit")');

    const isNotCorrectResponse = await page.isVisible('text="That is not the correct response"');
    expect(isNotCorrectResponse).toBeFalsy();

    const isCorrectResponse = await page.isVisible('text="Well done! : ASSERTME"');
    expect(isCorrectResponse).toBeTruthy()
});
