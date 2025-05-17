import { Locator, Page } from "@playwright/test";
import BasePage from "../SauceDemo/BasePage";

export default class InventoryPage extends BasePage
{
    readonly swagLabs: Locator;
    private readonly cartValue: Locator;
    private readonly cartIcon: Locator;

    constructor(public page: Page)
    {
        super(page);
        this.page = page;
        this.swagLabs = page.getByText('Swag Labs', { exact: true });
        this.cartIcon = page.locator('a.shopping_cart_link');
        this.cartValue = page.locator('.shopping_cart_badge');
    }

    async selectProduct(productName: string)
    {
        const productNames = await this.page.locator('.inventory_item_name').all();
        let products = productNames.length;
        console.log(`Number of products: ${products}`);  
        
        for(let i=0 ; i<products ; i++)
        {
           const expectedProductName = await productNames[i].innerText();
           console.log(`Product name: ${expectedProductName}`);

           if(expectedProductName === productName)
           {
                console.log(`Product name: ${expectedProductName} is selected`);
                await this.page.locator('.btn_inventory').nth(i).click();
                console.log(`Product name: ${expectedProductName} is added to the cart`);
                break;
           }
        }
    }

    async getCartValue()
    {
        const cartCount = await this.cartValue.innerText();
        return cartCount;
    }

    async navigateToProductDetailsPage(productName: string)
    {
        const productNames = await this.page.locator('.inventory_item_name').all();
        let products = productNames.length;
        console.log(`Number of products: ${products}`);  
        
        for(let i=0 ; i<products ; i++)
        {
           const expectedProductName = await productNames[i].innerText();
           console.log(`Product name: ${expectedProductName}`);

           if(expectedProductName === productName)
           {
                console.log(`Product name: ${expectedProductName} is selected`);
                await this.page.locator('.inventory_item_name').nth(i).click();
                console.log(`Product name: ${expectedProductName} is added to the cart`);
                break;
           }
        }
    }
}