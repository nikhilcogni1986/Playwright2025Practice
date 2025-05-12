import {test, expect} from '@playwright/test'

test('"Built In Locators', async({page})=>{

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",{timeout:60000});
    const brandImageLogo = page.getByAltText("company-branding");
    await expect(brandImageLogo).toBeVisible();

    //Login to Application
    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");
    await page.getByRole('button',{name:'Login'}).click();

})