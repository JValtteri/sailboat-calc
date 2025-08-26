import * as cookie from "./cookie.js"
import * as ui from "./ui.js"

/*
 * Buttons Event Listeners
 */

/* Submit button
 */
ui.submitButton.addEventListener("click", () => {
    ui.submit();
});

/* Clear button
 */
ui.clearBtn.addEventListener("click", () => {
    ui.clear();
});

/* Load button
 */
ui.loadBtn.addEventListener("click", () => {
    ui.loadBoatSpecs(ui.boatLoad.value);
});

/* Save button
 */
ui.saveBtn.addEventListener("click", () => {
    ui.saveBoat();
});

/* On Enter key
 */
body.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        ui.submit();
    }
});

/* On Delete key
 */
body.addEventListener('keydown', (event) => {
    if (event.key === "Delete") {
        ui.clear();
    }
});

/* "Fullscreen" clicked
 */
ui.fullscreenBtn.addEventListener("click", () => {
    ui.toggleFullscreen();
})


/*
 * Other Event Listeners
 */


/* Any input value changed
 */
ui.length.addEventListener("change", ui.update);
ui.waterline.addEventListener("change", ui.update);
ui.beam.addEventListener("change", ui.update);
ui.draft.addEventListener("change", ui.update);
ui.sailArea.addEventListener("change", ui.update);
ui.displacement.addEventListener("change", ui.update);
ui.ballast.addEventListener("change", ui.update);
ui.boatLoad.addEventListener("change", ui.isLoadBtnEnabled);

ui.boatName.addEventListener("input", ui.enableSave);

/* "Remember Me" clicked
 */
ui.cookieConsent.addEventListener('click', () => {
    if (cookieConsent.checked) {
        cookie.setCookie("length", util.base64(lengthInput.value), "");
    }
});

/* Clicked anywhere on document
 */
body.addEventListener("click", () => {
     if (ui.cookieConsent.checked) {
        if (cookie.getCookie("fullscreen") === "true" ) {
            makeFullscreen();
        }
    }
});

/*
 * Run At Start
 */

// Check concent from cookie
if (cookie.getCookie("consent") === "true" ) {
    ui.cookieConsent.checked = true
}

// Auto search if concented
if (ui.cookieConsent.checked) {
    if (cookie.getCookie("fullscreen") === "true" ) {
        ui.makeFullscreen();
    }
    ui.cookieConsent.checked = true;
    ui.submit();
    ui.activateUI();
}

ui.submit();
ui.updateBoats();
