import {test, expect} from '@playwright/test';
import LoginPage from '../../../Pages/SauceDemo/LoginPage';

const validUsername = "standard_user";
const validPassword = "secret_sauce";
const invalidUsername = "error_user";
const invalidPassword = "secret_sauce1";

test.describe('Login with Locked Out User', () => 
{
    test('Login with Locked Out User', async ({ page }) => {
        
        // Navigate to the login page
        const loginPage = new LoginPage(page);
        await page.goto('https://www.saucedemo.com/');
        await expect(loginPage.swagLabs).toBeVisible();
        await loginPage.login("locked_out_user", validPassword);
        
        // Verify the error message for locked out user
        await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
        await page.close();
    });

    test('Login with empty password', async ({ page }) => {
    
        // Navigate to the login page
        const loginPage = new LoginPage(page);
        await page.goto('https://www.saucedemo.com/');
        await expect(loginPage.swagLabs).toBeVisible();
        await loginPage.login(validUsername, "");
        
        // Verify the error message for empty password
        await expect(page.getByText('Epic sadface: Password is required')).toBeVisible();
        await page.close();
    });

    test('Login with empty username', async ({ page }) => {
    
        // Navigate to the login page
        const loginPage = new LoginPage(page);
        await page.goto('https://www.saucedemo.com/');
        await expect(loginPage.swagLabs).toBeVisible();
        await loginPage.login("", validPassword);
        
        // Verify the error message for empty username
        await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
        await page.close();
    });

    test('Login with empty credentials', async ({ page }) => {
    
        // Navigate to the login page
        const loginPage = new LoginPage(page);
        await page.goto('https://www.saucedemo.com/');
        await expect(loginPage.swagLabs).toBeVisible();
        await loginPage.login("", "");
        
        // Verify the error message for empty credentials
        await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
        await page.close();
    });

    test('Login with valid credentials', async ({ page }) => {
    
        // Navigate to the login page
        const loginPage = new LoginPage(page);
        await page.goto('https://www.saucedemo.com/');
        await expect(loginPage.swagLabs).toBeVisible();
        await loginPage.login(validUsername, validPassword); 
        // Verify that the user is logged in
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await page.close();
    });
    
    test('Login with Invalid credentials', async ({ page }) => {
        
        // Navigate to the login page
        const loginPage = new LoginPage(page);
        await page.goto('https://www.saucedemo.com/');
        await expect(loginPage.swagLabs).toBeVisible();
        await loginPage.login(invalidUsername,invalidPassword);
        
        // Verify the error message for invalid credentials
        await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
        await page.close();
    });
});