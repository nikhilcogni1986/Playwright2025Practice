import {test, expect} from '@playwright/test'

test('DatePicker', async ({ page }) =>
{
    await page.goto("http://localhost:4200/pages/iot-dashboard");
    await page.getByTitle("Forms").click();
    await page.getByTitle("Datepicker").click();

    // Select the date picker input field and click on it
    const calendarInput = page.locator('input[placeholder="Form Picker"]');
    await calendarInput.click();
    await page.waitForTimeout(2000);

    await page.locator('[class="day-cell ng-star-inserted"]').getByText('20').click();
    expect(await calendarInput.inputValue()).toBe('Apr 20, 2025');
    await page.waitForTimeout(2000);
})