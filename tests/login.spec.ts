import {test , expect} from '@playwright/test';
import { LoginPage} from './Pages/loginpage';
import { user } from './Data/users';

test('User can login with valid credentials',async({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(user.email,user.password);
    await expect(loginPage.successMessage).toBeVisible();
});

test('Submitting with both empty fields',async({page}) =>{
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.signIn.click();
    await expect (loginPage.errorMessage).toBeVisible();
})

test('Login with wrong credentials',async({page})=>{
    const loginPage = new LoginPage(page);
   await loginPage.goto();
   await loginPage.emailInput.fill('example@gmail.com');
   await loginPage.passwordInput.fill('1234xxx');
   await loginPage.signIn.click();
   await expect(loginPage.errorMessage).toBeVisible(); 
});

test('Login with Missing Email',async({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.passwordInput.fill('12314@A4h');
    await loginPage.signIn.click();
    await expect(loginPage.errorMessage).toContainText('Email is required');
})

test('Password is masked',async({page}) =>{
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.passwordInput).toHaveAttribute('type','password');
})

test('Navigate to Register',async({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.registerLink.click();
    await expect(page).toHaveURL('https://www.qapractice.com/register');
})