import {Page , Locator} from '@playwright/test';
export class LoginPage{
    readonly page : Page;
    readonly emailInput : Locator;
    readonly passwordInput : Locator;
    readonly checkbox : Locator;
    readonly signIn : Locator;
    readonly successMessage : Locator;
    readonly errorMessage : Locator;
    readonly registerLink : Locator

    constructor(page : Page){
        this.page = page;
        this.emailInput = page.getByTestId('login-email');
        this.passwordInput = page.getByTestId('login-password');
        this.checkbox = page.getByTestId('login-remember');
        this.signIn = page.getByTestId('login-submit');
        this.successMessage = page.getByTestId('login-success');
        this.errorMessage = page.getByTestId('login-error');
        this.registerLink = page.getByTestId('login-register');
    }

    async goto(){
        await this.page.goto(
            'https://www.qapractice.com/practice-login-form'
        );
    }

    async login(email:string,password:string){
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signIn.click();
    }

    async remembermeLogin(email:string,password:string){
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.checkbox.check();
        await this.signIn.click();
    }
}