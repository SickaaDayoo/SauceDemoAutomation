import { Page , Locator, expect } from '@playwright/test'



export class CartPage {

    readonly page: Page;
    readonly checkoutbtn: Locator;

    constructor (page: Page) {

        this.page = page;
        this.checkoutbtn = page.getByTestId('checkout');

    }

    async ClickCheckOut () {
        await this.checkoutbtn.click();

        await expect(this.page).toHaveURL(/checkout-step-one/);
    }

}