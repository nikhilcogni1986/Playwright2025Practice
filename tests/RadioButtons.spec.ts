import { test, expect } from '@playwright/test'

test('Select a Radio button', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.getByRole('radio', { name: 'Male', exact: true }).check();
    expect(await page.getByRole('radio', { name: 'Male', exact: true }).isChecked()).toBeTruthy();

    //Select Female radio button
    await page.getByRole('radio', { name: 'Female', exact: true }).check();
    expect(await page.getByRole('radio', { name: 'Female', exact: true }).isChecked()).toBeTruthy();
});

test('Demo to click a Radio button', async ({ page }) => {
    await page.goto("https://training.rcvacademy.com/test-automation-practice-page");
    await page.getByRole('radio', { name: 'JavaScript', exact: true }).check({ force: true });
    expect(await page.getByRole('radio', { name: 'JavaScript', exact: true }).isChecked()).toBeTruthy();
});

test('Radio buttons demo', async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();

    const usingTheGrid = page.locator('nb-card', { hasText: "Using the Grid" });
    await usingTheGrid.getByLabel("Option 1").check({ force: true });

    //Assertions
    const isRadioChecked = await usingTheGrid.getByLabel("Option 1").isChecked();
    expect(isRadioChecked).toBeTruthy();

    //Select Radio button Option 2
    await usingTheGrid.getByLabel("Option 2").check({ force: true });
    expect(await usingTheGrid.getByLabel("Option 1").isChecked()).toBeFalsy();
    expect(await usingTheGrid.getByRole('radio', { name: 'Option 2' }).isChecked()).toBeTruthy();
});
