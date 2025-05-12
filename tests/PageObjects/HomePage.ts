import {Locator, Page} from '@playwright/test';

export default class HomePage
{
    readonly txtSearchBox: Locator
    readonly btnSearch: Locator;
    readonly lblGreenKart: Locator;
    readonly lnkCartIcon: Locator;
    readonly txtProductName: Locator;
    readonly btnAddToCart: Locator;
    readonly btnCart: Locator;
    readonly lblProductItems: Locator;
    readonly lblProductPrice: Locator;
    readonly btnProceedToCheckout: Locator;

    constructor(public page: Page)
    {
        this.page = page;
        this.txtSearchBox = page.getByPlaceholder("Search for Vegetables and Fruits");
        this.btnSearch = page.locator("button[type='submit']");
        this.lblGreenKart = page.getByText('GreenKart', { exact: true });
        this.lnkCartIcon = page.getByRole('link', { name: 'Cart' });
        this.txtProductName = page.locator("h4.product-name");
        this.btnAddToCart = page.getByRole('button', { name: 'ADD TO CART' });
        this.btnCart = page.locator("img[alt='Cart']");
        this.lblProductItems = this.page.locator('div.cart > div.cart-info > table > tbody > tr:nth-child(1) > td:nth-child(3) > strong');
        this.lblProductPrice = this.page.locator("#root > div > header > div > div.cart > div.cart-info > table > tbody > tr:nth-child(2) > td:nth-child(3) > strong");
        this.btnProceedToCheckout = this.page.getByRole('button', { name: 'PROCEED TO CHECKOUT' });
    }

    async searchProduct(productName: string)
    {
        await this.txtSearchBox.fill(productName);
        await this.btnSearch.click();
        await this.page.waitForTimeout(5000);
    }

    /**
     * Searches for a product by name in the list of products and performs an action if the product is found.
     * 
     * @param productName - The name of the product to search for.
     * @returns A promise that resolves to the name of the product if found, or `undefined` if not found.
     * 
     * @remarks
     * - This method iterates through all products retrieved from `this.txtProductName`.
     * - If a product's name matches or includes the specified `productName`, it clicks the "ADD TO CART" button for that product.
     * - Logs the number of products, the matched product name, and the action performed.
     * 
     * @throws An error may be thrown if the "ADD TO CART" button is not interactable or if there are issues with the page elements.
     */
    async getProductNamePostSearch(productName: string)
    {
        const products = await this.txtProductName.all();
        for (const product of products)
        {
            console.log("Number of products: " +products.length);
            const expectedProductName = await product.textContent();
            if (expectedProductName && expectedProductName.includes(productName))
            {
                console.log("Product Name: " + expectedProductName);

                //Click on Add to Cart button
                await this.page.getByText("ADD TO CART").click({force: true});
                console.log("Clicked on Add to Cart button for product: " + expectedProductName);
                return expectedProductName;
            }
        }
    }

    async viewCart()
    {
        await this.btnCart.click();
    }

    async navigateToCheckoutPage()
    {
        await this.btnProceedToCheckout.click();
    }

}