import {expect, test} from '@playwright/test';
import LoginPage from '../../Pages/SauceDemo/LoginPage';
import InventoryPage from '../../Pages/SauceDemo/InventoryPage';

test.describe('Add prducts to cart', async() =>{

    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async({page}) =>{
        await page.goto('https://www.saucedemo.com/');
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('Add product to the cart', async({page}) =>{
        await inventoryPage.selectProduct('Sauce Labs Backpack');
        const cartCount = await inventoryPage.getCartValue();
        console.log(`Cart count: ${cartCount}`);
        expect(cartCount).toBe('1');
    });

    test('Verify the product details on product page', async({page}) =>
    {
        await inventoryPage.navigateToProductDetailsPage('Sauce Labs Backpack');
        const productName = await page.locator("[data-test='inventory-item-name']").textContent();
        const productDescription = await page.locator("[data-test='inventory-item-desc']").textContent();
        console.log(`Product Name: ${productName}`);
        console.log(`Product Description: ${productDescription}`);

        //Assertions
        expect(productName).toBe('Sauce Labs Backpack');
        expect(productDescription).toContain('carry.allTheThings() with the sleek');
    })
});