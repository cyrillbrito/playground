let aOffset = 30;
let _aOffset = false;
let lStart = 120;
let _lStart = true;
let lMult = 0.7;
let _lMult = false;

function setup() {
    createCanvas(600, 600);
    angleMode(DEGREES)

    colorMode(HSB, 100);
    frameRate(10);
}

function draw() {
    background(51, 50);

    if (aOffset >= 90 || aOffset <= 0)
        _aOffset = !_aOffset;

    if (lStart >= 150 || lStart <= 30)
        _lStart = !_lStart;

    if (lMult >= 0.75 || lMult <= 0.5)
        _lMult = !_lMult;

    aOffset += _aOffset ? 1 : -1;
    lStart += _lStart ? 1 : -1;
    lMult += _lMult ? 0.01 : -0.01;

    branch(width / 2, height, lStart, 90, getColor());
}

function branch(x, y, l, a, c) {

    const x_new = x - l * cos(a);
    const y_new = y - l * sin(a);

    stroke(c, 100, 100);
    line(x, y, x_new, y_new);

    if (l > 5) {
        let c_new = getColor(c);
        let l_new = l * lMult;
        branch(x_new, y_new, l_new, a + aOffset, c_new);
        branch(x_new, y_new, l_new, a - aOffset, c_new);
    }
}


let c_current = 0;

function getColor(c_previous) {
    if (c_previous) {
        return (c_previous + 2) % 100;
    } else {
        c_current += 1;
        return c_current % 100;
    }
}