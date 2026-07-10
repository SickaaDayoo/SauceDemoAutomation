import { Page, Locator, expect } from '@playwright/test'


export class InventoryPage {

    readonly page: Page;

    readonly CartBadge: Locator
    readonly Carticon: Locator


    constructor (page: Page) {
        this.page = page;
        this.CartBadge = page.getByTestId('shopping-cart-badge');
        this.Carticon = page.getByTestId('shopping-cart-link');

     
    }

    async  addProducttoCart (product: string) {

        await this.page.getByTestId(`add-to-cart-sauce-labs-${product}`).click();
    }

    async OpenChart () {

        await this.Carticon.click();

        await expect(this.page).toHaveURL(/cart/);
    }

    

}
