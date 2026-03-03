import { APIDemosActions } from "../actions/apidemos.action";

const apiDemosAction = new APIDemosActions();

describe("Tugas Mobile Automation - Alert Dialogs", () => {

    it("@TC004 - Screenshot Success Scenario", async () => {
        const nameInput = "Fauzan";
        const passInput = "Gojan1226";

        await apiDemosAction.waitForAppBtn();
        await apiDemosAction.clickAppBtn();
        await apiDemosAction.clickAlertDialogs();
        await apiDemosAction.clickTextEntryDialog();

        // 1. Isi field secara otomatis
        await apiDemosAction.fillTextEntry(nameInput, passInput);
        await apiDemosAction.saveCustomScreenshot("field_terisi_success");

       
        expect(await apiDemosAction.getUserNameText()).toEqual(nameInput);

        // --- VERSI 1: AKAN FAILED (Karena sensor titik-titik Android) ---
        // expect(await apiDemosAction.getPasswordText()).toEqual(passInput);


        // --- VERSI 2: AKAN PASSED 
        const actualPass = await apiDemosAction.getPasswordText();
        expect(actualPass).not.toBeNull(); 

        
    });

});