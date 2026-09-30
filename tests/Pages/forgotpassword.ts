import { Page, Locator } from '@playwright/test';
export class forgotPass{
    readonly page : Page;
    readonly emailInput : Locator;
    readonly submit : Locator;

    readonly securityCode : Locator;
    readonly securityCodeSubmit : Locator;

    readonly currentPassword : Locator;
    readonly newPassword : Locator;
    readonly confirmNewPassword : Locator;
    readonly resetPassword : Locator;

    constructor(page : Page){
        this.page = page;
        this.emailInput = page.getByTestId('forgot-email');
        this.submit = page.getByTestId('forgot-email-submit');
        this.securityCode = page.getByTestId('forgot-code');
        this.securityCodeSubmit = page.getByTestId('forgot-code-submit');
        this.currentPassword = page.getByTestId('forgot-current-password');
        this.newPassword = page.getByTestId('forgot-new-password');
        this.confirmNewPassword = page.getByTestId('forgot-confirm-password');
        this.resetPassword = page.getByTestId('forgot-submit');
    }

    async goto(){
        await this.page.goto('https://www.qapractice.com/forget-password');
    }

    async enterEmail(email : string){
        await this.emailInput.fill(email);
        await this.submit.click();
    }

    async enterSecurityCode(code : string){
        await this.securityCode.fill(code);
        await this.securityCodeSubmit.click();
    }

    async reset(currentPass:string,newPass:string,confirmNewPass:string){
        await this.currentPassword.fill(currentPass);
        await this.newPassword.fill(newPass);
        await this.confirmNewPassword.fill(confirmNewPass);
        await this.resetPassword.click();
    }

}