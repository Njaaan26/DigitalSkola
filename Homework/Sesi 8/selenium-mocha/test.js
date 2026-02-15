const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');
const edge = require('selenium-webdriver/edge');

describe('SauceDemo Automation Test', function () {
    this.timeout(60000);
    let driver;

    it('TC1 - Chrome: Login & Sort Harga Tertinggi', async function () {
        // === SETUP CHROME ===
        let options = new chrome.Options();
        options.addArguments('--incognito');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        // === BUKA WEBSITE ===
        await driver.get('https://www.saucedemo.com');

        // === CEK TITLE ===
        const title = await driver.getTitle();
        assert.strictEqual(title, 'Swag Labs');

        // === LOGIN ===
        await driver.findElement(By.css('[data-test="username"]'))
            .sendKeys('standard_user');
        await driver.findElement(By.css('[data-test="password"]'))
            .sendKeys('secret_sauce');
        await driver.findElement(By.css('[data-test="login-button"]'))
            .click();

        // === TUNGGU CART ===
        let cart = await driver.wait(
            until.elementLocated(By.css('[data-test="shopping-cart-link"]')),
            10000
        );
        await driver.wait(until.elementIsVisible(cart), 5000);

        // === ASSERT LOGO ===
        let logoText = await driver.findElement(By.className('app_logo')).getText();
        assert.strictEqual(logoText, 'Swag Labs');

        // === DROPDOWN SORT ===
        let dropdownSort = await driver.findElement(
            By.css('[data-test="product-sort-container"]')
        );
        await dropdownSort.click();

        let option = await driver.findElement(
            By.xpath('//option[text()="Price (high to low)"]')
        );
        await option.click();

        // BIAR KELIHATAN
        await driver.sleep(2000);

        // === TUTUP CHROME ===
        await driver.quit();
    });

    it('TC2 - Edge: Buka Website', async function () {
        // === SETUP EDGE ===
        let options = new edge.Options();
        // options.addArguments('--inprivate'); // optional

        driver = await new Builder()
            .forBrowser('MicrosoftEdge')
            .setEdgeOptions(options)
            .build();

        // === BUKA WEBSITE ===
        await driver.get('https://www.saucedemo.com');

        // BIAR KELIHATAN
        await driver.sleep(1000);
        

        // === TUTUP EDGE ===
        await driver.quit();
    });
});
