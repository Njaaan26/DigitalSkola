import { APIDemosActions } from "../actions/apidemos.action";

const apiDemosAction = new APIDemosActions();

describe("ApiDemos", async () => {
    it("Hello APIDemos", async () => {
        await apiDemosAction.waitForAppBtn();
        await apiDemosAction.clickAppBtn();
        await apiDemosAction.ClickSearchBtn();
        await apiDemosAction.ClickInvokeSearchBtn();
        await apiDemosAction.fillQueryField("Hello");
        await apiDemosAction.fillAppDataField("Hello");

        expect(await apiDemosAction.getQueryFieldValue()).toEqual("Hello");
        expect(await apiDemosAction.getAppDataFieldValue()).toEqual("Hello");
    });
});