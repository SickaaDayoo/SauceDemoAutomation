import { test, expect } from '../fixtures/loginfixtures'

import { InventoryPage } from '../pages/InventoryPages'

import CartData from '../test-data/CartData.json'



CartData.forEach((data) => {

    if (data.run !== 'yes') return;

    test (`Add  to Cart - ${data.product}`, async ({ page, loggedinPage }) => {


        await test.step('Check the correct URL', async () => {

            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        })
        
        const inventoryPage = new InventoryPage(page);
        
        await test.step ('Add product to cart', async () => {

            await inventoryPage.addProducttoCart(data.product);
        })

        await test.step('Validate product added to cart', async () => {

            await expect(inventoryPage.CartBadge).toHaveText(data.expected)
        })

        await test.step('Direct to Cart page', async () => {

            await inventoryPage.OpenChart();
        })

        await test.step('User Logout', async () => {

            await inventoryPage.OpenMenu();
        })

        await page.pause()

    })


})


