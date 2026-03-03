import { APIDemosActions } from "../actions/apidemos.action";

const apiDemosAction = new APIDemosActions();
let fillText: string;

describe("ApiDemos", async () => {
    before(async function() {
        fillText = "Hello";
    })

    beforeEach(async function() {
        await driver.relaunchActiveApp();
        fillText = this.currentTest?.title as string
    })

    afterEach(async function() {
        if (this.currentTest?.state === "failed") {
            await driver.takeScreenshot();
            await driver.saveScreenshot(`./screenshots/${this.currentTest.title}.png`);
        }
    })

    after(async function() {
        await driver.terminateApp('io.appium.android.apis');
    })

    it("@TC001 - First Scenario", async () => {
        await apiDemosAction.waitForAppBtn();
        await apiDemosAction.clickAppBtn();
        await apiDemosAction.ClickSearchBtn();
        await apiDemosAction.ClickInvokeSearchBtn();
        await apiDemosAction.fillQueryField(fillText);
        await apiDemosAction.fillAppDataField(fillText);

        expect(await apiDemosAction.getQueryFieldValue()).toEqual(fillText);
        expect(await apiDemosAction.getAppDataFieldValue()).toEqual(fillText);
    });

    it("@TC002 - Second Scenario", async () => {
        await apiDemosAction.waitForAppBtn();
        await apiDemosAction.clickAppBtn();
        await apiDemosAction.ClickSearchBtn();
        await apiDemosAction.ClickInvokeSearchBtn();
        await apiDemosAction.fillQueryField(fillText);
        await apiDemosAction.fillAppDataField(fillText);

        expect(await apiDemosAction.getQueryFieldValue()).toEqual(fillText);
        expect(await apiDemosAction.getAppDataFieldValue()).toEqual(fillText);
    });

    it("@TC003 - Third Scenario", async () => {
        await apiDemosAction.waitForAppBtn();
        await apiDemosAction.clickAppBtn();
        await apiDemosAction.ClickSearchBtn();
        await apiDemosAction.ClickInvokeSearchBtn();
        await apiDemosAction.fillQueryField(fillText);
        await apiDemosAction.fillAppDataField(fillText);

        expect(await apiDemosAction.getQueryFieldValue()).toEqual(fillText);
        expect(await apiDemosAction.getAppDataFieldValue()).toEqual(fillText);
    });
});