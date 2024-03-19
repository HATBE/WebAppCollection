const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 720;
canvas.height = 480;

const stoneSpawnDelay = 60; // in frames (60 = approx every sec.)
const missileSpawnDelay = 20; // in frames (60 = approx every sec.)

const targetFPS = 60;
const frameDelay = 1000 / targetFPS;
let oldTimeStamp = 0;
let currentFPS;

let keysPressed = {};

let gameover = false;

let stoneDelayCounter = 0;
let misslieDelayCounter = 0;

let player = {
    speed: 2.5,
    height: 20,
    width: 20,
    x: 0,
    y: 0,
}

let stones = [];
let missiles = [];

function doRectsIntersect(rect1X, rect1Y, rect1Height, rect1Width, rect2X, rect2Y, rect2Height, rect2Width) {
    // calculate the right, left, top, and bottom coordinates of each rect
    const rect1Right = rect1X + rect1Width - 1;
    const rect1Bottom = rect1Y + rect1Height - 1;
    const rect2Right = rect2X + rect2Width - 1;
    const rect2Bottom = rect2Y + rect2Height - 1;

    // check if rect1 is to the left of rect2
    if (rect1Right < rect2X || rect2Right < rect1X) {
        return false;
    }

    // check if rect1 is above rect2
    if (rect1Bottom < rect2Y || rect2Bottom < rect1Y) {
        return false;
    }

    // if none of the above conditions are met, the Rects intersect
    return true;
}

function gameOver() {
    gameover = true;
}

function createRandomStone() {
    stones.push({
        x: Math.floor(Math.random() * canvas.width) + 1,
        y: 0,
        speed: Math.round(((Math.random() * 2) + 1) * 10) / 10,
    });
}

function createMissile() {
    missiles.push({
        x: player.x + 5 + 1.5,
        y: player.y,
        speed: 2,
    });
}

function drawStones() {
    if(!stones) {return;}

    stones.forEach((stone) => {
        ctx.fillStyle = 'black';
        ctx.fillRect(stone.x, stone.y, 10, 10);
    });
}

function tickStones() {
    if(!stones) {return;}

    stones.forEach((stone, idx) => {
        stone.y += stone.speed;

        /*if(doRectsIntersect(stone.x, stone.y, 10 , 10, player.x, player.y, player.width, player.height)) {
            gameOver();
        }*/

        if(stone.y > canvas.height) {
            stones.splice(idx, 1);
        }
    });

    stoneDelayCounter--;
    if(stoneDelayCounter <= 0) {
        stoneDelayCounter = stoneSpawnDelay;
        createRandomStone(); // TODO: Timer
    }
}

function drawMissile() {
    if(!missiles) {return;}

    missiles.forEach((missile) => {
        ctx.fillStyle = 'green';
        ctx.fillRect(missile.x, missile.y, 3, 10);
    });
}

function tickMissile() {
    // TODO:
    if(!missiles) {return;}

    missiles.forEach((missile, idx) => {
        missile.y -= missile.speed;

        /*TODO: loop over stones an missiles, performance, wtf: if(doRectsIntersect(missile.x, missile.y, 3 , 10, player.x, player.y, player.width, player.height)) {
            deadStone();
        }*/

        if(missile.y <= 0) {
            missiles.splice(idx, 1);
        }
    });

    misslieDelayCounter--;
}

function drawPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.height, player.width);
}

function playerController() {
    if(keysPressed['a'] || keysPressed['ArrowDown']) {
        if(player.x - player.speed <= 0) {
            player.x = 0;
        } else {
            player.x -= player.speed;
        }
    }

    if(keysPressed['d'] || keysPressed['ArrowRight']) {
        if(player.x + player.speed > canvas.width +- player.width) {
            player.x = canvas.width - player.width;
        } else {
            player.x += player.speed;
        }
    }

    if(keysPressed['w']) {
        if(misslieDelayCounter <= 0) {
            misslieDelayCounter = missileSpawnDelay;
            createMissile();
        }
    }
}

function tick() {
    if(gameover) {
        // TODO: GAME OVER
        return;
    }

    playerController();
    tickMissile();
    tickStones();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(gameover) {
        return drawGameOver();
    }

    drawMissile();
    drawPlayer();
    drawStones();
}

function drawGameOver() {
    ctx.fillStyle = 'red';
    ctx.font = '72px Arial';
    const gameOverText = 'Game Over';
    ctx.fillText(gameOverText, canvas.width / 2 - ctx.measureText(gameOverText).width / 2, canvas.height / 2 + 26);
}

function gameLoop(timeStamp) {
    // Calculate the number of milliseconds passed since the last frame
    const elapsed = timeStamp - oldTimeStamp;

    // Check if enough time has passed to meet the target FPS
    if (elapsed >= frameDelay) {
        // Update oldTimeStamp
        oldTimeStamp = timeStamp;

        // Calculate fps
        currentFPS = Math.round(1000 / elapsed);

        // tick game
        tick();

        // draw game
        draw();
    }

    window.requestAnimationFrame((timeStamp) => {gameLoop(timeStamp)});
}

function keyboardListener() {
    document.addEventListener("keydown", (event) => {
        keysPressed[event.key] = true;
    });
    document.addEventListener("keyup", (event) => {
        keysPressed[event.key] = false;
    });
}

function init() {
    // set player to center bottom
    player.y = canvas.height - player.height; 
    player.x = (canvas.width / 2) - (player.width / 2); 

    keyboardListener();

    window.requestAnimationFrame((timeStamp) => {gameLoop(timeStamp)});
}

init();