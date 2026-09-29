import { Page, Locator } from '@playwright/test';
export class Register{
    readonly page : Page;
    readonly emailInput : Locator;
    readonly passwordInput : Locator;
    readonly confirmPassword : Locator;
    readonly register : Locator

    constructor(page : Page){
        this.page = page;
        this.emailInput = page.getByLabel('Email Address');
        this.passwordInput = page.getByTestId('register-password');
        this.confirmPassword = page.getByLabel('Confirm Password');
        this.register = page.getByTestId('register-submit');
    }

    async goto(){
        await this.page.goto('https://www.qapractice.com/register')
    }

    async registeruser(email:string,password:string,confirmpassword:string){
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.confirmPassword.fill(confirmpassword);
        await this.register.click();
    }
}