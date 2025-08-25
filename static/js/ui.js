/*
 * UI elements amd high level UI functions
 */

import * as util from "./utils.js"
import * as calc from "./calc.js"

export const body                 = document.getElementById('body');
// Inputs
export const boatName           = document.getElementById('boat-name');
export const boatLoad           = document.getElementById('boat-load');
export const length             = document.getElementById('length');
export const waterline          = document.getElementById('waterline');
export const beam               = document.getElementById('beam');
export const draft              = document.getElementById('draft');
export const sailArea           = document.getElementById('sail-area');
export const displacement       = document.getElementById('displacement');
export const ballast            = document.getElementById('ballast');

export const cookieConsent        = document.getElementById('accept');

// Outputs
const sailToDisplacement        = document.getElementById('sa-disp');
const ballastToDisplacement     = document.getElementById('bal-disp');
const displacementToLength      = document.getElementById('disp-len');
const comfort                   = document.getElementById('comfort');
const capsise                   = document.getElementById('capsise');
const hullspeed                 = document.getElementById('hullspeed');
const hullspeedLOA              = document.getElementById('hullspeed-loa');
const sfactor                   = document.getElementById('s-factor');

// Tables
export const outputTable        = document.getElementById("output");

// Variables

let calculated = false;

// Buttons
export const submitButton  = document.getElementById("submit-button");
export const clearBtn      = document.getElementById('clear-button');
export const fullscreenBtn = document.getElementById("fullscreen");
export const loadBtn       = document.getElementById("load");
export const saveBtn       = document.getElementById("save");


/* Toggle Fullscreen On or Off
 */
export function toggleFullscreen() {
    if (!document.fullscreenElement) {
        makeFullscreen();
    } else {
        document.exitFullscreen();
        if (cookieConsent.checked === true) {
            cookie.setCookie("fullscreen", "");
        }
    }
}

/* Turn on Fullscreen
 */
export function makeFullscreen() {
    document.querySelector("body").requestFullscreen()
                                  .catch((TypeError) => {});
    if (cookieConsent.checked === true) {
        cookie.setCookie("fullscreen", "true", ttl*DAY);
    }
}

export function isLoadBtnEnabled() {
    if (boatLoad.value === "") {
        loadBtn.setAttribute("disabled", "");
    } else {
        loadBtn.removeAttribute("disabled");
    }
}

/* Activate and show UI elements
 */
export function activateUI() {
    clearBtn.removeAttribute("disabled");      // Enables a button
    outputTable.removeAttribute("hidden");
}

/* Deactivate and hide UI elements
 */
export function deactivateUI() {
    clearBtn.setAttribute("disabled", "");      // Enables a button
    outputTable.setAttribute("hidden", "");
}

/* Used for the first time calculation
 * Activates the UI and
 * Updates all calculations
 */
export function submit() {
    calculated = true;
    activateUI();
    update();
}

/* Clear calculations
 */
export function clear() {
    clearBtn.setAttribute("disabled", "");
    deactivateUI();
    calculated = false;
}

export function loadBoatSpecs(name) {
    const boat          = util.getBoat(name);
    boatName.value      = boat["name"];
    length.value        = boat["length"];
    waterline.value     = boat["waterline"];
    beam.value          = boat["beam"];
    draft.value         = boat["draft"];
    sailArea.value      = boat["sa"];
    displacement.value  = boat["displacement"];
    ballast.value       = boat["ballast"];
    update();
    loadBtn.setAttribute("disabled", "");
}

export function updateBoats() {
    const element = boatLoad;
    util.clearOptions(element);
    addSelect(element);
    const localBoats = loadLocalBoats();
    const serverBoats = loadServerBoats();
    util.populateSelect(element, localBoats, util.optionInsert);
    util.populateSelect(element, serverBoats, util.optionInsert);
    // Enable Load Button
}

/* Updates all calculations
 */
export function update() {
    updateInputs();
    if (calculated) {
        updateSaDisp();
        updateBallastDisp();
        updateDispLength();
        updateComfort();
        updateCapsise();
        updateHullspeed();
        updateHullspeedLoa();
        updateSfactor();
        //color.removeColors();         // Remove any old colors
        //color.setColors();            // Set new colors
    }
}

function updateSaDisp() {
    sailToDisplacement.textContent = calc.sadisp(sailArea.value, displacement.value).toFixed(2);
}

function updateBallastDisp() {
    ballastToDisplacement.textContent = calc.baldisp(ballast.value, displacement.value).toFixed(2);
}

function updateDispLength() {
    displacementToLength.textContent = calc.displen(displacement.value, waterline.value).toFixed(2);
}

function updateComfort() {
    comfort.textContent = calc.comfort(displacement.value, length.value, waterline.value, beam.value).toFixed(2);
}

function updateCapsise() {
    capsise.textContent = calc.capsise(beam.value, displacement.value).toFixed(2);
}

function updateHullspeed() {
    hullspeed.textContent = calc.hullspeed(waterline.value).toFixed(2);
}

function updateHullspeedLoa() {
    hullspeedLOA.textContent = calc.hullspeed(length.value).toFixed(2);
}

function updateSfactor() {
    sfactor.textContent = calc.sFactor(displacement.value, waterline.value, sailArea.value).toFixed(2);
}

function updateInputs() {
    /*
    batteryType            = typeInput.value;
    voltage                = parseFloat(voltInput.value);
    temperature            = parseFloat(tempInput.value);
    */
}

// Parse local storage to load boats to list
function loadLocalBoats() {
    console.log("local storage not implemented")
}

// Load boats from static json
function loadServerBoats() {
    return util.getBoats();
}

function addSelect(element) {
    const option = document.createElement('option');
    option.innerText = "select";
    option.value = "";
    element.appendChild(option);
}
