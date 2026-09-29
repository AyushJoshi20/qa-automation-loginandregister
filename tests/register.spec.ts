import { registerusers } from './Data/registerUsers';
import  {test, expect } from "@playwright/test";
import { Register } from "./Pages/registerpage";


test('User registration',async({page})=>{
    const reg = new Register(page);
    await reg.goto();
    await reg.emailInput.fill(registerusers.email);
    await reg.passwordInput.fill(registerusers.password);
    await reg.confirmPassword.fill(registerusers.confirmpassword);
    await reg.register.click();
    await expect(page.getByText('Registration Successful')).toBeVisible();
})