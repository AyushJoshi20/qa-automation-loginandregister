import  {test, expect } from "@playwright/test";
import { Login } from "./Pages/loginpage";

test('TC-01, Login via valid credentials',async({page})=>{
    const loginPage = new Login(page);
    await loginPage.goto();
    await loginPage.login('user@premiumbank.com','Bank@123');
    await expect(page.getByText('Login Successful! Welcome to Premium Banking.'));  
})

test('TC-02 login via invalid email',async({page})=>{
    const loginPage = new Login(page);
    await loginPage.goto();
    await loginPage.emailInp.fill('premium@userbank.com');
    await loginPage.passwordInp.fill('Bank@123');
    await loginPage.signInSubmit.click();
    await expect(loginPage.errorMsg).toContainText('Invalid email id and password');
})

test('TC-03 login via invalid password',async({page})=>{
    const loginPage = new Login(page);
    await loginPage.goto();
    await loginPage.emailInp.fill('user@premiumbank.com');
    await loginPage.passwordInp.fill('Bank123');
    await loginPage.signInSubmit.click();
    await expect(loginPage.errorMsg).toContainText('Invalid email id and password');
})

test('TC-04 login with no credentials',async({page})=>{
    const loginPage = new Login(page);
    await loginPage.goto();
    await loginPage.signInSubmit.click();
    await expect(loginPage.loginErrorMsg).toContainText('Email and Password are required');
})

test('TC-05 login with empty email field',async({page})=>{
    const loginPage = new Login(page);
    await loginPage.goto();
    await loginPage.passwordInp.fill('Bank@123');
    await loginPage.signInSubmit.click();
    await expect(loginPage.errorMsg).toContainText("Email is required");
})

test('TC-06 login with empty password field',async({page})=>{
    const loginPage = new Login(page);
    await loginPage.goto();
    await loginPage.emailInp.fill('user@premiumbank.com');
    await loginPage.signInSubmit.click();
    await expect(loginPage.errorMsg).toContainText("Password is required");
})

test('TC-07 password is masked',async({page})=>{
    const loginPage = new Login(page);
    await loginPage.goto();
    await expect(loginPage.passwordInp).toHaveAttribute('type','password');
})

test('TC-08 navigate to link Forgot Password',async({page})=>{
    const loginPage = new Login(page);
    await loginPage.goto();
    await loginPage.forgotPasswordLink.click();
    await expect(page).toHaveURL('https://www.qapractice.com/forget-password');
})

test('TC-09 Navigate to register',async({page})=>{
    const loginPage = new Login(page);
    await loginPage.goto();
    await loginPage.registerNowLink.click();
    await expect(page).toHaveURL('https://www.qapractice.com/register');
})

test(' TC-10 Login page UI elements are visible', async ({page}) => {
  const loginPage = new Login(page);
  await loginPage.goto();
  await expect(loginPage.emailInp).toBeVisible();
  await expect(loginPage.passwordInp).toBeVisible();
  await expect(loginPage.rememberMeCheckbox).toBeVisible();
  await expect(loginPage.forgotPasswordLink).toBeVisible();
  await expect(loginPage.signInSubmit).toBeVisible();
  await expect(loginPage.registerNowLink).toBeVisible();
});

test('TC-11 Login fields have correct input type',async({page})=>{
    const loginPage = new Login(page);
    await loginPage.goto();
    await expect(loginPage.emailInp).toHaveAttribute('type','email');
    await expect(loginPage.passwordInp).toHaveAttribute('type','password');
    await expect(loginPage.rememberMeCheckbox).toHaveAttribute('type','checkbox');
})

test('TC-12 Login fields should have correct placeholders', async ({ page }) => {

  await page.goto('https://www.qapractice.com/practice-login-form');

  await expect(page.getByTestId('login-email'))
    .toHaveAttribute('placeholder', 'Enter your email');

  await expect(page.getByTestId('login-password'))
    .toHaveAttribute('placeholder', 'Enter your password');
});