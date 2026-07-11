import { Page, Locator, expect } from '@playwright/test'


export class InventoryPage {

    readonly page: Page;

    readonly CartBadge: Locator
    readonly Carticon: Locator
    readonly menu: Locator
    readonly logoutbtn: Locator


    constructor (page: Page) {
        this.page = page;
        this.CartBadge = page.getByTestId('shopping-cart-badge');
        this.Carticon = page.getByTestId('shopping-cart-link');
        this.menu = page.getByRole('button', {name: 'Open Menu'});
        this.logoutbtn = page.getByTestId('logout-sidebar-link');

     
    }

    async  addProducttoCart (product: string) {

        await this.page.getByTestId(`add-to-cart-sauce-labs-${product}`).click();
    }

    async OpenChart () {

        await this.Carticon.click();

        await expect(this.page).toHaveURL(/cart/);
    }

    async OpenMenu() {

        await this.menu.click();
        await this.logoutbtn.click();

        await expect(this.page).toHaveURL('https://www.saucedemo.com/');
    }

    

}
