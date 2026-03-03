import { APIDemosPage } from "../pageobjects/apidemos.page";

export class APIDemosActions {
    async waitForAppBtn() {
        await APIDemosPage.appBtn().waitForDisplayed({ timeout: 5000 });
    }

    async clickAppBtn() {
        await APIDemosPage.appBtn().click();
    }

    async verifyAppBtn() {
        return await APIDemosPage.appBtn().isDisplayed();
    }

    async ClickSearchBtn() {
        await APIDemosPage.searchBtn().click();
    }

    async ClickInvokeSearchBtn() {
        await APIDemosPage.InvokeSearchBtn().click();
    }

    async fillQueryField(query: string) {
        await APIDemosPage.prefillQueryField().setValue(query);
    }

    async fillAppDataField(query: string) {
        await APIDemosPage.appDataField().setValue(query);
    }

    async getQueryFieldValue() {
        return await APIDemosPage.prefillQueryField().getText();
    }

    async getAppDataFieldValue() {
        return await APIDemosPage.appDataField().getText();
    }
                    async clickAlertDialogs() {
    await APIDemosPage.alertDialogsBtn().click();
}

    async clickTextEntryDialog() {
    await APIDemosPage.textEntryDialogBtn().click();
}

    async fillTextEntry(name: string, pass: string) {
    await APIDemosPage.userNameField().setValue(name);
    await APIDemosPage.passwordField().setValue(pass);
}

    async getUserNameText() {
    return await APIDemosPage.userNameField().getText();
}

    async getPasswordText() {
    return await APIDemosPage.passwordField().getText();
}

    async saveCustomScreenshot(name: string) {
    await driver.saveScreenshot(`./screenshots/${name}.png`); 
}

}