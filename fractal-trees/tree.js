function setup() {
    createCanvas(600, 600);
    angleMode(DEGREES)
    frameRate(1);

    background(51);
    stroke(255);
    branch(width / 2, height, 30, 90, 300);
}

// fazer um sistema em que a largura do tronco é tipo a vida
// se o tronco se separar a largura tem se de dividir no dois
// oi seja se ficar com dois iguais cada um vai ter metado do anterior
// quando um tronco se separa a prob de ser grande tem de ser mais para o pequeno
// usar nepar por todo o lado
// You can do it
// (>00)> <(00<)
// troncos mais pequenos podem ter angulo maior

function draw() {}

function branch(x, y, l, angle, life) {
    const newX = x - l * cos(angle);
    const newY = y - l * sin(angle);

    strokeWeight(a2d(life));
    line(x, y, newX, newY);
    life -= 1;

    if (life < 0)
        return;


    const left_life = randExp() * life / 100;
    life -= left_life;
    branch(newX, newY, l, 90-45, left_life);

    const right_life = randExp() * life / 100;
    life -= right_life;
    branch(newX, newY, l, 90+45, right_life);

    branch(newX, newY, l, 90, life);
    console.log(randExp());



    // if (l > 2) {
    //     //branch(newX, newY, l * lMult, a);
    //     branch(newX, newY, l * lMult, a + aOffset);
    //     branch(newX, newY, l * lMult, a - aOffset);
    // }
}

function a2d(a) {
    return 2 * sqrt(a / PI);
}

function randExp() {
    return floor(pow(pow(100, 1 / 100), random(20, 80)));
}