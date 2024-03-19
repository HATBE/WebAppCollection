// TODO: handleX() -> drawX and tickX, better performance, less loops!!
// TODO: WAVE SYSTEM

let debug = false;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1280;
canvas.height = 720;

const stoneSpawnDelay = 30; // in frames (60 = approx every sec.)
const missileSpawnDelay = 20; // in frames (60 = approx every sec.)

const targetFPS = 60;
const frameDelay = 1000 / targetFPS;
let oldTimeStamp = 0;
let currentFPS;

let keysPressed = {};

let gameover = false;

let points = 0;
let stoneDelayCounter = 0;
let misslieDelayCounter = 0;

let player = {
    speed: 5,
    height: 50,
    width: 70,
    x: 0,
    y: 0,
}

let stones = [];
let missiles = [];

const backgroundImage = new Image();
const stoneImage = new Image();
const playerImage = new Image();
backgroundImage.src = "space.jpg";
stoneImage.src = "stone.png";
playerImage.src = "ufo.png";

function doRectsIntersect(rect1X, rect1Y, rect1Width, rect1Height, rect2X, rect2Y, rect2Width, rect2Height) {
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

function drawStroke(x,y,width, height, color = "yellow", lineWidth = 4) {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.strokeRect(x ,y ,width, height);
}

function gameOver() {
    gameover = true;
}

function createRandomStone() {
    stones.push({
        x: Math.floor(Math.random() * (canvas.width)) + 1,
        y: 0,
        speed: Math.round(((Math.random() * 2) + 1) * 10) / 10,
        width: 80,
        height: 80,
    });
}

function createMissile() {
    let missileWidth = 8;
    missiles.push({
        x: player.x + (player.width / 2) - (missileWidth / 2),
        y: player.y,
        speed: 15,
        width: missileWidth,
        height: 20,
    });
}

function drawStones() {
    if(!stones) {return;}

    stones.forEach((stone) => {
        ctx.drawImage(stoneImage, stone.x, stone.y, stone.width, stone.height);
        
        debug && drawStroke(stone.x, stone.y, stone.width, stone.height);
    });
}

function tickStones() {
    if(!stones) {return;}

    stones.forEach((stone, idx) => {
        stone.y += stone.speed;
        // check if stones collide with player
        if(doRectsIntersect(stone.x, stone.y, stone.width , stone.height, player.x, player.y, player.width, player.height)) {
            if(stone.y > canvas.height) {
                stones.splice(idx, 1);
            }
            gameOver();
            return;
        }

        if(stone.y > canvas.height) {
            stones.splice(idx, 1);
        }
    });

    stoneDelayCounter--;
    if(stoneDelayCounter <= 0) {
        stoneDelayCounter = stoneSpawnDelay;
        createRandomStone();
    }
}

function drawMissile() {
    if(!missiles) {return;}

    missiles.forEach((missile) => {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(missile.x, missile.y, missile.width, missile.height);

        debug && drawStroke(missile.x, missile.y, missile.width, missile.height, "blue");
    });
}

function tickMissile() {
    if(!missiles) {return;}

    missiles.forEach((missile, missileIdx) => {
        missile.y -= missile.speed;

        stones.forEach((stone, stoneIdx) => {
            if(doRectsIntersect(stone.x, stone.y, stone.width, stone.height, missile.x, missile.y, missile.width, missile.height)) {
                stones.splice(stoneIdx, 1);
                missiles.splice(missileIdx, 1);
                points++;
            }
        });

        if(missile.y <= 0) {
            missiles.splice(missileIdx, 1);
        }
    });

    if(misslieDelayCounter > 0) {
        misslieDelayCounter--;
    }
}

function drawPlayer() {
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);

    if(debug) {
        drawStroke(player.x, player.y, player.width, player.height, "red");
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(player.x + (player.width / 2), player.y); ctx.lineTo(player.x + (player.width / 2), 0); ctx.stroke();
    }

}

function playerController() {
    if(keysPressed['a'] || keysPressed['A'] || keysPressed['ArrowLeft']) { 
        if(player.x - player.speed <= 0) {
            player.x = 0;
        } else {
            player.x -= player.speed;
        }
    }

    if(keysPressed['d'] || keysPressed['D'] || keysPressed['ArrowRight']) {
        if(player.x + player.speed > canvas.width +- player.width) {
            player.x = canvas.width - player.width;
        } else {
            player.x += player.speed;
        }
    }

    if(keysPressed[' '] || keysPressed['ArrowUp']) { // space bar
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
        drawGameOver();
        return;
    }

    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    ctx.font = "20px ARIAL"
    ctx.fillStyle = '#fff';
    ctx.fillText(`MC: ${(misslieDelayCounter / 60).toFixed(1)}`, 0, 16);
    ctx.fillText(`SCORE: ${points}`, 0, 32);

    if(debug) {
        ctx.fillStyle = '#f00';
        fpsText = `FPS: ${currentFPS}`;
        ctx.fillText(fpsText, canvas.width - ctx.measureText(fpsText).width, 16);
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

        if(keysPressed['m'] && keysPressed['d']) {
            debug = !debug;
        }
    });
    document.addEventListener("keyup", (event) => {
        keysPressed[event.key] = false;
    });
}

function init() {
    // set player to center bottom
    player.y = canvas.height - player.height - 15; // -15 for floating effect
    player.x = (canvas.width / 2) - (player.width / 2); 

    keyboardListener();

    window.requestAnimationFrame((timeStamp) => {gameLoop(timeStamp)});
}

init();