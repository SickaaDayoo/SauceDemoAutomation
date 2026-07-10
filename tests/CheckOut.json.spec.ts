

import { test, expect } from '@playwright/test'

import { LoginPage } from '../pages/LoginPages'

import { InventoryPage } from '../pages/InventoryPages'

import { CartPage } from '../pages/CartPages'

import { CheckOutPage } from '../pages/CheckOutPages'

import CheckOutData from '../test-data/CheckOutData.json'


CheckOutData.forEach((data) => {

    if (data.run !== 'yes') return;

    test (`CheckProduct - ${data.product} - ${data.expected}`, async ({ page }) => {

        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckOutPage(page);

        await test.step('Browse to saucdemo.com', async () => {
        
            await loginPage.gotoLoginPage();
        })

        
        await test.step('Input valid Credentials', async () => {

            await loginPage.login (
                data.username,
                data.password
            )
        })

        await test.step ('Add product to cart', async () => {

            await inventoryPage.addProducttoCart(data.product);
        })

        await test.step('Direct to Cart page', async () => {

            await inventoryPage.OpenChart();
        })

        await test.step('click checkout button', async () => {
            await cartPage.ClickCheckOut();
        })

        await test.step('Fill Information', async () =>{

            await checkoutPage.FillCheckOutForm(
                data.firstname,
                data.lastname,
                data.postalcode
            )
        })

        await test.step('validate Information', async () => {

            if (data.expected === 'success') {

                await checkoutPage.ContinueCheckout()  
            } else {
                await checkoutPage.ContinueCheckoutIncomplete()
            }

        })
    })


})
