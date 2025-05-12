import { Locator, Page } from "@playwright/test";

export default class LoginPage
{
    readonly txtUserName: Locator;
    readonly txtPassword: Locator;
    readonly btnLogin: Locator;
    readonly swagLabs: Locator;

    constructor(public page: Page)
    {
        this.page = page;
        this.txtUserName = page.getByPlaceholder("Username");
        this.txtPassword = page.getByPlaceholder("Password");
        this.btnLogin = page.getByRole('button', { name: 'Login' });
        this.swagLabs = page.getByText('Swag Labs', { exact: true });
    }

    async login(username: string, password: string)
    {
        await this.txtUserName.fill(username);
        await this.txtPassword.fill(password);
        await this.btnLogin.click();
    }
}