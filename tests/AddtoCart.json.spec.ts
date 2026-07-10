import { test, expect } from '@playwright/test'

import { LoginPage } from '../pages/LoginPages'

import { InventoryPage } from '../pages/InventoryPages'

import CartData from '../test-data/CartData.json'



CartData.forEach((data) => {

    if (data.run !== 'yes') return;

    test (`Add  to Cart - ${data.product}`, async ({ page }) => {

        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

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

        await test.step('Validate product added to cart', async () => {

            await expect(inventoryPage.CartBadge).toHaveText(data.expected)
        })

        await test.step('Direct to Cart page', async () => {

            await inventoryPage.OpenChart();
        })

        await page.pause()

    })


})


