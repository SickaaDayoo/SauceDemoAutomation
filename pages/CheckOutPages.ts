import { Page , Locator, expect } from '@playwright/test'

export class CheckOutPage {

    readonly page: Page;

    readonly firstname: Locator;
    readonly lastname: Locator;
    readonly postalcode: Locator;

    readonly continuebtn: Locator;
    readonly finishbtn: Locator;

    readonly completemsg: Locator;
    readonly errormsg: Locator;

    readonly btnhome: Locator;


    constructor (page: Page) {

        this.page = page;
        this.firstname = page.getByTestId('firstName');
        this.lastname = page.getByTestId('lastName');
        this.postalcode = page.getByTestId('postalCode');

        this.continuebtn = page.getByTestId('continue');
        this.finishbtn = page.getByTestId('finish');
        
        this.completemsg = page.getByTestId('complete-header');

        this.errormsg = page.getByTestId('error');

        this.btnhome = page.getByTestId('back-to-products');



    }

    async FillCheckOutForm (firstname: string, lastname: string, postalcode: string)
    {
        await this.firstname.fill(firstname);
        await this.lastname.fill(lastname);
        await this.postalcode.fill(postalcode);
    }

    async ContinueCheckout() {

        await this.continuebtn.click();

        await expect(this.page).toHaveURL(/checkout-step-two/);

        await this.finishbtn.click();

        await expect(this.page).toHaveURL(/checkout-complete/);

        await expect(this.completemsg).toBeVisible();

        await this.btnhome.click();

        await expect(this.page).toHaveURL(/inventory/);
    }

    async ContinueCheckoutIncomplete() {

        await this.continuebtn.click();

        await expect(this.errormsg).toBeVisible();
    }

}