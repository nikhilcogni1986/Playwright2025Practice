import {test, expect} from '@playwright/test';
import LoginPage from '../../PageObjects/SauceDemo/LoginPage';
import InventoryPage from '../../PageObjects/SauceDemo/InventoryPage';

test.describe('Logout Tests', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await page.goto('https://www.saucedemo.com/');
    });

    test('Logout from SauceDemo', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.swagLabs.click();
        await page.getByRole('button', { name: 'Open Menu' }).click();
        await page.getByRole('link', { name: 'Logout' }).click();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
});