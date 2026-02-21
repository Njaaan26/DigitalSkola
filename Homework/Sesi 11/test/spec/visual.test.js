const { Builder } = require('selenium-webdriver');
const LoginAction = require('../action/action.login');
const { compareScreenshot } = require('../../utilities/visual_regression.helper');

describe('Visual Regression - Login Page', () => {
    let driver;
    let loginAction;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        loginAction = new LoginAction(driver);
        await loginAction.openLoginPage('https://www.saucedemo.com/');
    });

    afterEach(async () => {
        await driver.quit();
    });

    it('visual check - login success', async () => {
        await loginAction.inputUsername('standard_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLogin();
        await loginAction.assertLoginSuccess();

        await compareScreenshot(driver, 'login_success');
    });

    it('visual check - empty username', async () => {
        await loginAction.clickLogin();

        await loginAction.assertLoginFailed(
            'Epic sadface: Username is required'
        );

        await compareScreenshot(driver, 'login_failed_empty_username');
    });

    it('visual check - wrong password', async () => {
        await loginAction.inputUsername('standard_user');
        await loginAction.inputPassword('wrong_password');
        await loginAction.clickLogin();

        await loginAction.assertLoginFailed(
            'Epic sadface: Username and password do not match any user in this service'
        );

        await compareScreenshot(driver, 'login_failed_wrong_password');
    });

    it('visual check - locked out user', async () => {
        await loginAction.inputUsername('locked_out_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLogin();

        await loginAction.assertLoginFailed(
            'Epic sadface: Sorry, this user has been locked out.'
        );

        await compareScreenshot(driver, 'login_failed_locked_user');
    });
});