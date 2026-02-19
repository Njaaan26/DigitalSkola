const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');
const edge = require('selenium-webdriver/edge');

describe('SauceDemo Automation with Hooks', function () {
    this.timeout(60000);

    let driver;
    let browser = 'chrome'; // ganti ke 'edge' kalau mau

    // 🔹 HOOK BEFORE
    before(async function () {
        if (browser === 'chrome') {
            let options = new chrome.Options();
            options.addArguments('--incognito');

            driver = await new Builder()
                .forBrowser('chrome')
                .setChromeOptions(options)
                .build();
        } else {
            let options = new edge.Options();

            driver = await new Builder()
                .forBrowser('MicrosoftEdge')
                .setEdgeOptions(options)
                .build();
        }
    });

    // 🔹 TEST CASE 1
    it('Login ke SauceDemo', async function () {
        await driver.get('https://www.saucedemo.com');

        const title = await driver.getTitle();
        assert.strictEqual(title, 'Swag Labs');

        await driver.findElement(By.css('[data-test="username"]'))
            .sendKeys('standard_user');
        await driver.findElement(By.css('[data-test="password"]'))
            .sendKeys('secret_sauce');
        await driver.findElement(By.css('[data-test="login-button"]'))
            .click();

        let cart = await driver.wait(
            until.elementLocated(By.css('[data-test="shopping-cart-link"]')),
            10000
        );
        await driver.wait(until.elementIsVisible(cart), 5000);
    });

    // 🔹 TEST CASE 2
    it('Sort produk berdasarkan harga tertinggi', async function () {
        let dropdown = await driver.findElement(
            By.css('[data-test="product-sort-container"]')
        );
        await dropdown.click();

        let option = await driver.findElement(
            By.xpath('//option[text()="Price (high to low)"]')
        );
        await option.click();

        await driver.sleep(3000);
    });

    // 🔹 HOOK AFTER
    after(async function () {
        await driver.quit();
    });
});
