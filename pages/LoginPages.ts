import { Page, Locator, expect } from '@playwright/test'


export class LoginPage {

    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginbutton: Locator;
    readonly ErrorMessage: Locator


    constructor (page: Page) {
        this.page = page;
        this.username = page.getByTestId('username');
        this.password = page.getByTestId('password');
        this.loginbutton = page.getByTestId('login-button');
        this.ErrorMessage = page.getByTestId('error')
    }

    // Action

    async gotoLoginPage() {

        await this.page.goto('https://www.saucedemo.com/')

    }

    async login(user: string, pass: string) {

        await this.username.fill(user);
        await this.password.fill(pass);
        await this.loginbutton.click();
    }

    async VerificationAccess() {

        await expect(this.page).toHaveURL(/inventory/)

    }

    async VerificationFailed () {

        await expect(this.ErrorMessage).toBeVisible()
    }

}
