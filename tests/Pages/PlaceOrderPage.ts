import {Locator, Page} from '@playwright/test';

export default class CheckoutPage
{
    readonly lblProductName: Locator;
    readonly lblProductPrice: Locator;
    readonly lblProductQuantity: Locator;
    readonly lblProductTotal: Locator;
    readonly imgGreenkart: Locator;
    readonly btnPlaceOrder: Locator;

    constructor(public page: Page)
    {
        this.page = page;
        this.imgGreenkart = this.page.locator("div.brand.greenLogo");
        this.lblProductName = this.page.locator("div.products tbody > tr:nth-child(1) > td:nth-child(2) p");
        this.lblProductPrice = this.page.locator("div.products tbody > tr:nth-child(1) > td:nth-child(4) p");
        this.lblProductQuantity = this.page.locator("div.products tbody > tr:nth-child(1) > td:nth-child(3) p");
        this.lblProductTotal = this.page.locator("div.products tbody > tr:nth-child(1) > td:nth-child(5) p");
        this.btnPlaceOrder = this.page.getByRole('button',{name:'Place Order'});
    }

    
}