import {Page,Locator, expect} from '@playwright/test'

export class Login{
    readonly page : Page;
    readonly emailInp : Locator;
    readonly passwordInp : Locator;
    readonly signInSubmit : Locator;
    readonly errorMsg : Locator;
    readonly successMsg : Locator;
    readonly loginErrorMsg : Locator;
    readonly forgotPasswordLink : Locator;
    readonly registerNowLink : Locator;
    readonly rememberMeCheckbox : Locator;

    constructor(page : Page){
        this.page = page;
        this.emailInp = page.getByTestId('login-email');
        this.passwordInp = page.getByTestId('login-password');
        this.signInSubmit = page.getByTestId('login-submit');
        this.errorMsg = page.getByTestId('login-error');
        this.successMsg = page.getByTestId('login-success');
        this.loginErrorMsg = page.getByTestId('login-error');
        this.forgotPasswordLink = page.getByRole('link',{name : 'Forgot password?'})
        this.registerNowLink = page.getByRole('link',{name : 'Register now'});
        this.rememberMeCheckbox = page.	getByTestId('login-remember');
    }

    async goto(){
        await this.page.goto('https://www.qapractice.com/practice-login-form');
    }

    async login(email : string, password : string){
        await this.emailInp.fill(email);
        await this.passwordInp.fill(password);
        await this.signInSubmit.click();
    }
}