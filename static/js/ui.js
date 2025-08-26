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
let boats      = null;   // Merged JSON object of local and server boats
let localBoats = null;     //JSON object of local boats

// Buttons
export const submitButton  = document.getElementById("submit-button");
export const clearBtn      = document.getElementById('clear-button');
export const fullscreenBtn = document.getElementById("fullscreen");
export const loadBtn       = document.getElementById("load");
export const saveBtn       = document.getElementById("save");
export const deleteBtn     = document.getElementById("delete");


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

export function onSelect() {
    deleteBtn.setAttribute("hidden", "");
    loadBtn.removeAttribute("hidden");
    if (boatLoad.value === "") {
        loadBtn.setAttribute("disabled", "");
        return;
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

/* Enable Save button
 */
export function onText() {
    saveBtn.removeAttribute("disabled");
    deleteBtn.setAttribute("hidden", "");
    loadBtn.removeAttribute("hidden");
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

/* Load specific boats specs
 */
export function loadBoatSpecs(name) {
    let boat = boats[name];
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
    if (boats[boatLoad.value]["local"]) {
        loadBtn.setAttribute("hidden", "");
        deleteBtn.removeAttribute("hidden");
        deleteBtn.removeAttribute("disabled");
    } else {
        deleteBtn.setAttribute("hidden", "");
        loadBtn.removeAttribute("hidden");
    }
}

/* Update boat selection Dropdown
 */
export function updateBoats() {
    const element = boatLoad;
    util.clearOptions(element);                             // Clear initialize dropdown menu
    addSelect(element);                                     // Add null option
    localBoats = loadLocalBoats();
    const serverBoats = loadServerBoats();
    boats = {...serverBoats, ...localBoats};                // Merge local and server boats
    util.populateSelect(element, boats, util.optionInsert);
    // Enable Load Button
}

export function onModify() {
    saveBtn.removeAttribute("disabled");
    update();
}

/* Updates all calculations
 */
function update() {
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

/* Load data of the given boat
 */
export function loadBoat(name) {
    return boats[name];
}

/* Save the current boat with the current name
 */
export function saveBoat() {
    localBoats[boatName.value]                  = {};
    localBoats[boatName.value]["name"]          = boatName.value;
    localBoats[boatName.value]["length"]        = length.value;
    localBoats[boatName.value]["waterline"]     = waterline.value;
    localBoats[boatName.value]["beam"]          = beam.value;
    localBoats[boatName.value]["draft"]         = draft.value;
    localBoats[boatName.value]["sa"]            = sailArea.value;
    localBoats[boatName.value]["displacement"]  = displacement.value;
    localBoats[boatName.value]["ballast"]       = ballast.value;
    localBoats[boatName.value]["local"]         = true;
    loadBtn.setAttribute("disabled", "");
    saveBtn.setAttribute("disabled", "");
    util.saveToLocal(localBoats);
    updateBoats();
}

export function deleteBoat() {
    const boat = boatLoad.value;
    delete localBoats[boat];
    util.saveToLocal(localBoats);
    updateBoats();
    deleteBtn.setAttribute("hidden", "");
    loadBtn.removeAttribute("hidden");
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
    return util.loadLocalBoats();
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
