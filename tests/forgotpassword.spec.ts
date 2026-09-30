import { test, expect } from "@playwright/test";
import { forgotPass } from "./Pages/forgotpassword";

test('User can reset password', async ({ page }) => {

    const pass = new forgotPass(page);

    await pass.goto();
    await pass.enterEmail('user@premiumbank.com');

    await expect(pass.securityCode).toBeVisible();
    await pass.enterSecurityCode('BANK1234');    
    
    await expect(pass.currentPassword).toBeVisible();
    await pass.reset(
        'Bank@123',
        'NewBank@123',
        'NewBank@123'
    );

    await expect(page.getByText('Password Changed Successfully'));  
});

test('Cannot reset password with wrong security code', async ({ page }) => {

    const pass = new forgotPass(page);

    await pass.goto();
    await pass.enterEmail('user@premiumbank.com');

    await expect(pass.securityCode).toBeVisible();
    await pass.enterSecurityCode('WRONG123');
    await expect(pass.securityCode).toBeVisible();

    await expect(pass.currentPassword).not.toBeVisible();
});