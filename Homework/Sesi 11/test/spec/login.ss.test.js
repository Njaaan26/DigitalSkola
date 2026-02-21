const { Builder } = require('selenium-webdriver');
const LoginAction = require('../action/action.login');
const SharingAction = require('../action/action.sharing');
const LoginPage = require('../pageobject/login.page');

describe('Login', () => {
    let driver;
    let loginAction;
    let sharingAction;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        loginAction = new LoginAction(driver);
        sharingAction = new SharingAction(driver);
        await loginAction.openLoginPage('https://www.saucedemo.com/');
    });

    afterEach(async () => {
        await driver.quit();
    });

    it('should login with valid credentials', async () => {
        await loginAction.inputUsername('standard_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLogin();
        await loginAction.assertLoginSuccess();

        await sharingAction.fullPageScreenshot('login_success');
    });

    it('should login with invalid username', async () => {
        await loginAction.clickLogin();
        await loginAction.assertLoginFailed('Epic sadface: Username is required');

        await sharingAction.fullPageScreenshot('login_failed_empty_username');
        await sharingAction.partialScreenshot(LoginPage.errorMessage, 'login_failed_empty_username_partial');
    });

    it('should login with wrong password', async () => {
    await loginAction.inputUsername('standard_user');
    await loginAction.inputPassword('wrong_password');
    await loginAction.clickLogin();

    await loginAction.assertLoginFailed(
        'Epic sadface: Username and password do not match any user in this service'
    );

    await sharingAction.fullPageScreenshot('login_failed_wrong_password');
    await sharingAction.partialScreenshot(
        LoginPage.errorMessage,
        'login_failed_wrong_password_partial'
    );
});

it('should login with locked out user', async () => {
    await loginAction.inputUsername('locked_out_user');
    await loginAction.inputPassword('secret_sauce');
    await loginAction.clickLogin();

    await loginAction.assertLoginFailed(
        'Epic sadface: Sorry, this user has been locked out.'
    );

    await sharingAction.fullPageScreenshot('login_failed_locked_user');
    await sharingAction.partialScreenshot(
        LoginPage.errorMessage,
        'login_failed_locked_user_partial'
    );
});
});
