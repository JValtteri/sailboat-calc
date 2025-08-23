/* sailboat-calc
 * calc module
 * Contains all used math functions
 */

const pow=Math.pow;
const sqrt=Math.sqrt;

const magic = 8063/8192 // 1+129 //551/560;  // Adjustment factor
const feet = 3.281;

export function sadisp(sa, disp) {
    const k = 2/3;
    return sa/pow(disp/magic, k);
}

export function baldisp(ballast, disp) {
    return ballast/disp * 100;
}

export function displen(disp, len) {
    let answer = disp*magic/pow(len*feet*0.01,3)/1;
    return answer;
}

export function comfort(disp, loa, lwl, beam) {
    const magic = 4.69;     // Adjustment factor
    let answer = disp/((0.7*lwl+0.3*loa)*pow(beam, 1.333))/magic*1000;
    return answer;
}

export function capsise(beam, disp) {
    let answer = beam/pow(disp/1000, (1/3))/10;
    return answer;
}

export function hullspeed(len) {
    let speed = 1.34*sqrt(feet*len);
    return speed;
}

//export function sFactor(disp, waterline, area) {
//    let factor = 3.972*(pow(10,(-displen(disp, waterline)/526+(0.691*(Math.log(area/disp)-1),0.8))));
//    return factor;
//}
