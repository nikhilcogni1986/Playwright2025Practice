import { test, expect } from '@playwright/test';

test('Asserting for attributes on a web element', async ({ page }) => 
{
    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");

    //assertions
    await expect(page.locator("#user-name")).toHaveAttribute("data-test","username");
    await expect(page.locator("#password")).toHaveAttribute("data-test","password");
    await expect(page.locator("#login-button")).toHaveAttribute("data-test","login-button");
    await page.close(); 
});

test('Validating the URL of the page', async({page})=>
{
  await page.goto("https://www.saucedemo.com/");

  //assertions
  await expect(page).toHaveURL("https://www.saucedemo.com/");
  await expect(page).toHaveURL(/saucedemo/);
  await expect(page).toHaveURL(/.*saucedemo/);  
  await page.close();

});

test('Validating the title of the page', async({page})=>
{
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

  //assertions
  await expect(page).toHaveTitle("OrangeHRM");
  await expect(page).toHaveTitle(/OrangeHRM/);
  await expect(page).toHaveTitle(/.*OrangeHRM/);
  await page.close();
});
