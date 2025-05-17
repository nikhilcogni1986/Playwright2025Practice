import { expect, Locator, Page } from "@playwright/test";

export default class BasePage
{
    Page: Page;
    constructor(public page: Page)
    {
        this.page = page;
    }

    async navigateTo(url: string)
    {
        await this.page.goto(url);
    }

    async getPageTitle()
    {
        return await this.page.title();
    }

    async getPageUrl()
    {
        return await this.page.url();
    }

    async fillInputField(locator: Locator, value: string)
    {
        await locator.fill(value);
        await expect(locator).toHaveValue(value);
    }

    async clickElement(element: Locator)
    {
        await element.click();
    }

    async getElementText(element: Locator)
    {
        return await element.innerText();
    }

    async getElementAttribute(element: Locator, attribute: string)
    {
        return await element.getAttribute(attribute);
    }

    async waitForElementHidden(selector: string)
    {
        await this.Page.waitForSelector(selector,{ state: 'hidden' });
    }
}