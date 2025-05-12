import {test} from '@playwright/test'

test('Select Vegetable', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/");
    await page.getByPlaceholder("Search for Vegetables and Fruits").fill("Cuc");
    await page.waitForTimeout(3000);
    await page.locator("button.search-button").click();
    await page.waitForSelector("div.product-action button");

    await page.locator("div.product-action button").click();
    await page.getByRole('link', { name: 'Cart' }).click();

    const btnProceedToCheckout = page.getByRole('button',{name:'PROCEED TO CHECKOUT'});

    await btnProceedToCheckout.waitFor();
    await btnProceedToCheckout.click();

    const title = page.locator('span').filter({hasText:"KART"});
    await title.waitFor();

    //get the product name
    const productName = await page.locator(".products p.product-name").innerText();
    await console.log(productName);
})