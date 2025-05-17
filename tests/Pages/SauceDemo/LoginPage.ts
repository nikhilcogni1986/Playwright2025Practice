import { Locator, Page } from "@playwright/test";
import BasePage from "../SauceDemo/BasePage";

export default class LoginPage extends BasePage
{
    private readonly txtUserName: Locator;
    private readonly txtPassword: Locator;
    private readonly btnLogin: Locator;
    readonly swagLabs: Locator;

    constructor(public page: Page)
    {
        super(page);
        this.page = page;
        this.txtUserName = page.getByPlaceholder("Username");
        this.txtPassword = page.getByPlaceholder("Password");
        this.btnLogin = page.getByRole('button', { name: 'Login' });
        this.swagLabs = page.getByText('Swag Labs', { exact: true });
    }

    async login(username: string, password: string)
    {
        await this.fillInputField(this.txtUserName,username);
        await this.fillInputField(this.txtPassword,password);
        await this.clickElement(this.btnLogin);
    }
}