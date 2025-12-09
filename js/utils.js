/*
 * Miscellanious functions
 */

import * as boat from "./boats.js?id=MTc1NjMyNzIwMQ"

/*
 * Low level page manipulation functions
 */

/* Clear content of an HTML element
 */
export function clearOptions(element) {
    element.innerHTML='';
}

/*
 * Populates a select (drop-down) element with options
 * element: Target HTML element <select>
 * json:    Data to use
 * func:    Function to process the given data
 */
export function populateSelect(element, json, func) {
    element.removeAttribute("disabled");
    // Creates a sorted list of boats (sorterd by displacement)
    let boats = [];
    for (const item in json) {
        boats.push(json[item]);
    }
    boats.sort(compare);
    // Populates the element with the sorted list
    for (const item in boats) {
        func(element, boats, item);
    }
}

/*
 * Other Misc Functions
 */

/* Converts str to Base64, via uint8
 */
export function base64(str) {
    const encoder = new TextEncoder();
    const utf8Bytes = encoder.encode(str);
    return btoa(String.fromCharCode(...utf8Bytes));
}

/* Function used to customize uif.populateSelect() function
 */
export function optionInsert(element, json, item) {
    const name = json[item]["name"];
    const type = json[item]["name"];
    const option = document.createElement('option');
    option.innerText = name;
    option.value = type;
    element.appendChild(option);
}

/* Returns server boats JSON
 */
export function getBoats() {
    return boat.boats;
}

/* Returns local boats JSON
 */
export function loadLocalBoats() {
    let json = JSON.parse(localStorage.getItem("local_boats"));
    if (json === null) {
        return {};
    }
    return json;
}

/* Saves a boat to local JSON
 */
export function saveToLocal(json) {
    localStorage.setItem("local_boats", JSON.stringify(json));
}

/* Compare function to sort by displacement
 */
function compare(a, b) {
    const sortBy = "displacement";
    return a[sortBy] > b[sortBy] ? 1 : a[sortBy] < b[sortBy] ? -1 : 0;
}
