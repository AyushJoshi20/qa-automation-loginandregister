import {test , expect} from '@playwright/test';
import { LoginPage } from './Pages/loginpage';
import { user } from './Data/users';

test('User can login with valid credentials',async({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(user.email,user.password);
    await expect(loginPage.successMessage).toBeVisible();
});