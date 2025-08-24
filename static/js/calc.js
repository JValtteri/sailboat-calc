/* sailboat-calc
 * calc module
 * Contains all used math functions
 */


// Math functions
const pow=Math.pow;
const sqrt=Math.sqrt;
const log=Math.log10;

// Conversion consts
const feet = 3.281;
const water = 1025;  // Salt water dencity
const longTon = 2240 //lbs
const lbs = 2204.623 //xkg
const dFactor = longTon/lbs;


/* Sail are to Displacement
 */
export function sadisp(sa, disp) {
    return sa/pow(disp/water, 0.667) /100;
}

/* Ballast% of displacement
 */
export function baldisp(ballast, disp) {
    return ballast/disp * 100;
}

/* Displacement Length
 */
export function displen(disp, len) {
    let answer = disp/dFactor/pow(len*feet*0.01,3)/1;
    return answer;
}

export function comfort(disp, loa, lwl, beam) {
    const k = 7.30307  // Adjustment factor
    let answer = disp*dFactor/(.65*((0.7*lwl)+(0.3*loa))*pow(beam, 1.333))/k*1000;
    return answer;
}

/* Capsise screening formula
 */
export function capsise(beam, disp) {
    let answer = beam/pow(disp/dFactor/1000, (1/3))/10;
    return answer;
}

/* Hullspeed
 */
export function hullspeed(len) {
    let speed = 1.34*sqrt(feet*len);
    return speed;
}

/* S# Number
 */
export function sFactor(disp, waterline, area) {
    const dlr = displen(disp, waterline);
    const sad = sadisp(area, disp);
    let factor = 3.972 * pow(10, -dlr / 526 + 0.691 * pow( log(sad)-1, 0.8 ));
    // S# = 3.972 * 10^(- displen(disp, waterline)/526 + 0.691 * (log(sadisp(area, disp))-1)^0.8)
    //    = 3.972 x 10^[-DLR/526 + 0.691 x (log(SAD)-1)^0.8]
    return factor;
}
