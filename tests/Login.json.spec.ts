import { test, expect } from '@playwright/test'

import { LoginPage } from '../pages/LoginPages'

import LoginData from '../test-data/LoginData.json'

LoginData.forEach((data) => {
    if (!data.run) return;

    test(`Login  - ${data.username}`, async ({page}) => {

        const loginPage = new LoginPage(page);

        await test.step('Browse to saucedemo.com', async () => {

            await loginPage.gotoLoginPage();

        })

        await test.step(`Login with ${data.username}`, async () => {

            await loginPage.login(data.username, data.password)
        })
        
        
        await test.step('validate credentials', async () => {

            if (data.expected === 'success') {

                await loginPage.VerificationAccess()  
            } else {
                await loginPage.VerificationFailed()
            }


        })

        



    })
})
