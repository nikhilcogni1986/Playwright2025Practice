import {test, expect} from '@playwright/test';
import HomePage from '../PageObjects/HomePage';
import CheckoutPage from '../PageObjects/CheckoutPage';

const productName = "Cucumber";
const searchProductName = "Cuc";
const productQuantity = "1";
const productPrice = "48";


test("Search a product", async ({page}) =>
{
    const homePage = new HomePage(page);
    const chkOutPage = new CheckoutPage(page);
    
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/");
    await page.waitForLoadState('networkidle');
    await expect(homePage.lblGreenKart).toBeVisible({timeout: 5000});
    await homePage.searchProduct(searchProductName);
    await page.waitForLoadState('networkidle');

    //Validate if product is searched
    const searchedProductName = await homePage.getProductNamePostSearch(productName);
    console.log("Searched Product Name: " + searchedProductName);
    expect(searchedProductName).toContain(productName);

    //View Cart and validate product details
    await homePage.viewCart();
    expect(await homePage.lblProductItems.textContent()).toContain(productQuantity);
    expect(await homePage.lblProductPrice.textContent()).toContain(productPrice);
    await expect(homePage.btnProceedToCheckout).toBeVisible();

    //Navigate to Checkout page
    await homePage.navigateToCheckoutPage();
    await expect(chkOutPage.imgGreenkart).toBeVisible();
    expect(await chkOutPage.lblProductName.textContent()).toContain(productName);
    expect(await chkOutPage.lblProductQuantity.textContent()).toContain(productQuantity);

    //Place the order
    await chkOutPage.btnPlaceOrder.click();
    await expect(page.url()).toContain("https://rahulshettyacademy.com/seleniumPractise/#/country");
    await page.getByRole('combobox').selectOption('India');
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Proceed' }).click();
});