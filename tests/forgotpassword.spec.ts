import { passwordTest } from './Data/registerUsers';
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

for(const passwordTests of passwordTest){
    test(passwordTests.name,async({page})=>{
        const pass = new forgotPass(page);

        await pass.goto();
        await pass.enterEmail('user@premiumbank.com');

        await expect(page.getByText('Verify Security Code'));
        await pass.enterSecurityCode('BANK1234');
        await expect(page.getByText('Reset Password'));

        await pass.currentPassword.fill('Bank@123');
        await pass.newPassword.fill(passwordTests.password);
        await pass.confirmNewPassword.fill(passwordTests.password);
        await pass.resetPassword.click();

        await expect(page.getByText('Password does not meet requirements'));
    })
}