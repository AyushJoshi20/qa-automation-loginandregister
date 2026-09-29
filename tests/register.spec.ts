import { passwordTest, registerusers } from './Data/registerUsers';
import  {test, expect } from "@playwright/test";
import { Register } from "./Pages/registerpage";


test('User registration With correct rules',async({page})=>{
    const reg = new Register(page);
    await reg.goto();
    await reg.emailInput.fill(registerusers.email);
    await reg.passwordInput.fill(registerusers.password);
    await reg.confirmPassword.fill(registerusers.confirmpassword);
    await reg.register.click();
    await expect(page.getByText('Registration Successful')).toBeVisible();
})

test('Registration with mismatch passwords',async({page})=>{
    const reg = new Register(page);
    await reg.goto();
    await reg.emailInput.fill(registerusers.email);
    await reg.passwordInput.fill(registerusers.password);
    await reg.confirmPassword.fill('Test@123456');
    await reg.register.click();
    await expect(page.getByText('Passwords do not match')).toBeVisible();

})

test('Cannot register with Invalid Password rule',async({page})=>{
    const reg = new Register(page);
    await reg.goto();
    await reg.emailInput.fill(registerusers.email);
    await reg.passwordInput.fill('test123');
    await reg.confirmPassword.fill('test123');
    await reg.register.click();
    await expect(page.getByText('Password does not meet the requirements')).toBeVisible();
})

test('Cannot with register with Empty crendentials',async({page})=>{
    const reg = new Register(page);
    await reg.goto();
    await reg.register.click();
    await expect(page.getByText('Email is required')).toBeVisible();
})

test('cannot register with Empty Password field',async({page})=>{
    const reg = new Register(page);
    await reg.goto();
    await reg.emailInput.fill(registerusers.email);
    await reg.register.click();
    await expect(page.getByText('Password is required'));
})

test('Cannot register with invalid email format', async ({ page }) => {

    const reg = new Register(page);

    await reg.goto();

    await reg.emailInput.fill('asdasd');
    await reg.passwordInput.fill(registerusers.password);
    await reg.confirmPassword.fill(registerusers.confirmpassword);

    await reg.register.click();

    const isValid = await reg.emailInput.evaluate(
        (input: HTMLInputElement) => input.validity.valid
    );

    expect(isValid).toBe(false);
});

for(const passwordTests of passwordTest){
    test(passwordTests.name,async({page})=>{
        const reg = new Register(page);
        await reg.goto();
        await reg.emailInput.fill(`test${Date.now()}@example.com`);
        await reg.passwordInput.fill(passwordTests.password);
        await reg.confirmPassword.fill(passwordTests.password);
        await reg.register.click();
        await expect(page.getByText('Registration successfull')).not.toBeVisible();
    })
}