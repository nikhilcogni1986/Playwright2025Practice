import {test, expect} from '@playwright/test';
// This test suite demonstrates how to use parameterized tests in Playwright.

const credentials = [
    {username: "standard_user", password: "secret_sauce"},
    {username: "locked_out_user", password: "secret_sauce"},
    {username: "problem_user", password: "secret_sauce"}
];

credentials.forEach(data =>
{
    test(`Login with ${data.username}`, async ({ page }) => {
        // Navigate to the login page
        await page.goto('https://www.saucedemo.com/');
        await expect(page.getByText('Swag Labs')).toBeVisible();
        await page.fill('[data-test="username"]', data.username);
        await page.fill('[data-test="password"]', data.password);
        await page.click('[data-test="login-button"]');
        
        // Verify successful login
        if (data.username === "standard_user" || data.username === "problem_user") {
            await expect(page.getByText('Products')).toBeVisible();
        } else {
            await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
        }
    }); 
});