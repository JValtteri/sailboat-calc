import * as cookie from "./cookie.js"
import * as ui from "./ui.js?id=MTc1NjI4MTUwOQ"

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

/* Delete button
 */
ui.deleteBtn.addEventListener("click", () => {
    if (confirm(`Are you sure you want to delete Boat '${ui.boatLoad.value}'?`)) {
        ui.deleteBoat();
    }
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
ui.length.addEventListener("change", ui.onModify);
ui.waterline.addEventListener("change", ui.onModify);
ui.beam.addEventListener("change", ui.onModify);
ui.draft.addEventListener("change", ui.onModify);
ui.sailArea.addEventListener("change", ui.onModify);
ui.displacement.addEventListener("change", ui.onModify);
ui.ballast.addEventListener("change", ui.onModify);
ui.boatLoad.addEventListener("change", ui.onSelect);        // Dropdown
ui.boatName.addEventListener("input", ui.onText);       // Name field

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
