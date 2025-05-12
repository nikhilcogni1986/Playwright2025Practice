import { test, expect } from '@playwright/test'

test('Dialog Box demo', async ({ page }) => {
    await page.goto("http://localhost:4200/pages/iot-dashboard");
    await page.getByTitle("Tables & Data").click();
    await page.getByTitle("Smart Table").click();

    page.on('dialog', async dialog => {
        console.log(dialog.message());
        expect(dialog.message()).toBe("Are you sure you want to delete?");
        await dialog.accept();
    });

    await page.locator("tbody").locator('tr', { hasText: 'mdo@gmail.com' }).locator(".nb-trash").click();
    await page.waitForTimeout(2000);
    expect(page.locator('table tr').first()).not.toHaveText("mdo@gmail.com");
});

test('Simple Alert Dialog Box demo', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    page.on('dialog', async dialog => {
        console.log(dialog.message());
        expect(dialog.message()).toBe("I am an alert box!");
        await dialog.accept();
    });
    await page.getByRole('button', { name: 'Simple Alert' }).click();
});

test('Confirmation Alert Dialog Box demo', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    page.on('dialog', async dialog => {
        console.log(dialog.message());
        expect(dialog.message()).toBe("Press a button!");
        await dialog.dismiss();
        expect(await page.locator("p#demo").textContent()).toBe("You pressed Cancel!");
    });
    await page.getByRole('button', { name: 'Confirmation Alert' }).click();
});

test('Prompt Alert Dialog Box demo', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    page.on('dialog', async dialog => {
        console.log(dialog.message());
        expect(dialog.message()).toBe("Please enter your name:");
        await dialog.accept("John Doe");
        expect(await page.locator("p#demo").textContent()).toContain("Hello John Doe! How are you today?");
    });
    await page.getByRole('button', { name: 'Prompt Alert' }).click();
});

test('JavaScript Popup - Alert box', async ({ page }) => 
{
    await page.goto("https://training.rcvacademy.com/test-automation-practice-page");

    // Click on the "JavaScript Alerts" popup buton
    page.on('dialog',async dialog =>{
        console.log(dialog.message());
        expect(dialog.message()).toBe("Hello! I am JavaScript alert box!");
        await dialog.accept();
    });
    await page.locator('#cu-form-1696568355495').getByRole('button', { name: 'Click me' }).click();
});
