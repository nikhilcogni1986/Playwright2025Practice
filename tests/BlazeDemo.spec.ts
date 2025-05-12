import {test, expect} from '@playwright/test'

test("Login to Blaze Demo", async({page})=>{

    await page.goto("https://demoblaze.com/");
    await expect(page.locator("#nava")).toBeVisible();

    await page.getByRole('link',{name:"Log in"}).click();
    await page.locator("#loginusername").fill("nikhilrao@test.com");
    await page.locator("#loginpassword").fill("Password1234");
    await page.getByRole('button',{name:"Log in"}).click();

    //assertion
    const lnkLogout = page.getByRole('link',{name:"Log out"});
    await expect(lnkLogout).toBeVisible();

    //Logout
    await lnkLogout.click(); 

    //assertion
    await expect(page).toHaveURL("https://demoblaze.com/index.html");
})