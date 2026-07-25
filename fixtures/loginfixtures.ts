import { test as base } from '@playwright/test'

import { LoginPage } from '../pages/LoginPages'

type MyFixtures = {

    loggedinPage: LoginPage;
}

export const test = base.extend<MyFixtures>({

    loggedinPage: async ({page}, use) => {

        const loginPage = new LoginPage(page);

        await loginPage.gotoLoginPage();

        await loginPage.login(

            'standard_user',
            'secret_sauce'
        )

        await use (loginPage);
    }

})

export {expect} from '@playwright/test'