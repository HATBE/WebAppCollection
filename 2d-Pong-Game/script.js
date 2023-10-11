const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

const debugMenuEl = document.getElementById('debug-menu');
const debugGridEl = document.getElementById('debug-grid-btn');

// game logic
const debug = {
    enabled: false,
    grid: false
}

let oldTimeStamp = 0;
const targetFPS = 60;
const frameDelay = 1000 / targetFPS;
let currentFPS;

const gameStates = {
    menu: 0,
    inGame: 1,
    gameOver: 2
}
let currentGameState = gameStates.menu;

const keysPressed = {};
let winner = 'none';

// game init states
const gameWidth = 650;
const gameHeight = 490;

const pixelSize = 10;

const ballSize = pixelSize * 1;
const pedalHeight = 9 * pixelSize;

const ballSpeed = 3;

// dynamic object states
let ballX = 0;
let ballY = 0 

let ballDX = 0;
let ballDY = 0;

let leftPedalY = 0;
let leftPedalX = 0;
let rightPedalY = 0;
let rightPedalX = 0;

let scoreLeft = 0;
let scoreRight = 0;

// ============================
// GAMESTATES
//============================

function switchGameStateToMenu() {
    currentGameState = gameStates.menu;
}

function switchGameStateToInGame() {
    currentGameState = gameStates.inGame;
    resetGame();
}

function switchGameStateToGameOver() {
    currentGameState = gameStates.gameOver;
}

// ============================
// DRAWING
//============================

function drawDebugGrid() {
    // checkered pattern over whole background
    for(let y = 0; y < gameHeight; y += pixelSize) {
        for(let x = 0; x < gameWidth; x += pixelSize) {
            ctx.fillStyle = x % (pixelSize * 2) ^ y % (pixelSize * 2) ? 'lightgreen' : 'green';
            ctx.fillRect(x, y, pixelSize, pixelSize);
        }
    }

    // center crosshair
    ctx.fillStyle = 'red';
    ctx.fillRect(0, canvas.height / 2, canvas.width, 1);
    ctx.fillRect(canvas.width / 2, 0, 1, canvas.height);
}

function drawFps() {
    ctx.fillStyle = 'red';
    ctx.font = "13px ARIAL";

    ctx.fillText(`FPS: ${currentFPS}`, 0, 13);
}

//----------------------------
// IN-GAME

function drawInGameBackground() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function drawInGameBall() {
    ctx.fillStyle = 'white';
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
}

function drawInGameLeftPedal() {
    ctx.fillStyle = 'white';
    ctx.fillRect(leftPedalX, leftPedalY, pixelSize, pedalHeight);
}

function drawInGameRightPedal() {
    ctx.fillStyle = 'white';
    ctx.fillRect(rightPedalX, rightPedalY, pixelSize, pedalHeight);
}

function drawInGameCenterLine() {
    ctx.fillStyle = 'white';
    ctx.setLineDash([pixelSize, pixelSize])
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 1);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
}

function drawInGameScore() {
    ctx.fillStyle = 'white';
    ctx.font = "48px ARCADECLASSIC";
    ctx.fillText(scoreLeft, 29, 37);
    ctx.fillText(scoreRight, canvas.width - ctx.measureText(scoreRight).width - 28, 37);
}

function drawClearCanvas() {
    ctx.clearRect(0, 0, gameWidth, gameHeight);
}

function drawInGame() {
    drawInGameBackground();
    
    debug.enabled && debug.grid && drawDebugGrid();

    drawInGameCenterLine();
    drawInGameScore();
 
    drawInGameBall();
    drawInGameLeftPedal();
    drawInGameRightPedal();
}

//----------------------------
// MENU

function drawMenuBackground() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function drawMenu() {
    drawMenuBackground();

    debug.enabled && debug.grid && drawDebugGrid();
    
    const title = `Pong`;
    const subtitle = 'Press "S" to start the game!';
    const infoText = 'Press "ESC" to quit the game.';

    ctx.fillStyle = 'white';
    ctx.font = "60px ARCADECLASSIC";
    ctx.fillText(title, (canvas.width / 2) - (ctx.measureText(title).width / 2), (canvas.height / 2) - 10);
    ctx.fillStyle = 'red';
    ctx.font = "25px ARCADECLASSIC";
    ctx.fillText(subtitle, (canvas.width / 2) - (ctx.measureText(subtitle).width / 2), (canvas.height / 2) + 20);
    ctx.fillStyle = 'white';
    ctx.font = "16px ARCADECLASSIC";
    ctx.fillText(infoText, (canvas.width / 2) - (ctx.measureText(infoText).width / 2), canvas.height - 10);
}

//----------------------------
// GAME OVER

function drawGameOverBackground() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function drawGameOver() {
    drawGameOverBackground()

    debug.enabled && debug.grid && drawDebugGrid();

    const title = `Game OVER!`;
    const subtitle = `${winner} is the Winner.`;
    const infoText = 'Press "M" to go to the menu.';

    ctx.fillStyle = 'red';
    ctx.font = "60px ARCADECLASSIC";
    ctx.fillText(title, (canvas.width / 2) - (ctx.measureText(title).width / 2), (canvas.height / 2) - 10);
    ctx.fillStyle = 'white';
    ctx.font = "25px ARCADECLASSIC";
    ctx.fillText(subtitle, (canvas.width / 2) - (ctx.measureText(subtitle).width / 2), (canvas.height / 2) + 20);
    ctx.fillStyle = 'white';
    ctx.font = "16px ARCADECLASSIC";
    ctx.fillText(infoText, (canvas.width / 2) - (ctx.measureText(infoText).width / 2), canvas.height - 10);
}

//----------------------------
// DRAW

function draw() {
    // clear canvas
    drawClearCanvas();

    if(currentGameState === gameStates.menu) {
        drawMenu();
    } else if(currentGameState === gameStates.inGame) {
        drawInGame();
    } else if(currentGameState === gameStates.gameOver) {
        drawGameOver();
    }

    debug.enabled && drawFps();
}

// ============================
// GAME LOGIC 
//============================

function checkBallIntersectingPedals() {
    // if ball intersects left pedal, redirect
    if(ballX < leftPedalX + pixelSize && ballY + ballSize > leftPedalY && ballY < leftPedalY + pedalHeight) { // right, top, bottom
        ballDX = -ballDX;
    }
    // if ball intersects right, redirect
    else if(ballX + ballSize > rightPedalX && ballY + ballSize > rightPedalY && ballY < rightPedalY + pedalHeight) { // left, top, bottom
        ballDX = -ballDX;
    }
}

function checkBallIntersectingWall() {
    // if ball intersects top, redirect
    if(ballY <= 0) { 
        ballDY = -ballDY;
    }
    // if ball intersects bottom, redirect
    else if(ballY + ballSize >= gameHeight) { 
        ballDY = -ballDY;
    }
    // if ball intersects left, death
    else if(ballX <= 0) { 
        rightScored();
        resetBall();
    }
    // if ball intersects right, death
    else if(ballX + ballSize >= gameWidth) { 
        leftScored();
        resetBall();
    }
}

function resetGame() {
    winner = 'none';
    resetScore();
    resetBall();
    resetPedals();
}

function resetScore() {
    scoreRight = scoreLeft = 0;
}

function resetBall() {
    // set ball to center
    ballX = (gameWidth / 2) - (ballSize / 2); // center center
    ballY = (gameHeight / 2)  - (ballSize / 2); // center center

    // set random ball game delta
    ballDX = Math.random() < 0.5 ? ballSpeed : -ballSpeed;
    ballDY = Math.random() < 0.5 ? ballSpeed : -ballSpeed;;
}

function resetPedals() {
      // set padels to center (left and right)
      leftPedalY = (gameHeight / 2) - (pedalHeight / 2); // left center
      leftPedalX = pixelSize;
      rightPedalY = (gameHeight / 2) - (pedalHeight / 2); // right center
      rightPedalX = gameWidth - (pixelSize * 2);
}

function rightScored() {
    scoreRight++;

    if(scoreRight >= 10) {
        winner = 'right';
        switchGameStateToGameOver();
    }
}

function leftScored() {
    scoreLeft++;

    if(scoreLeft >= 10) {
        winner = 'left';
        switchGameStateToGameOver();
    }
}

// ============================
// TICKING
//============================

function tickMenu() {
 
}

function tickIngame() {
    // add or remove from delta x/y
    ballX += ballDX ;
    ballY += ballDY;

    checkBallIntersectingWall();
    checkBallIntersectingPedals();
}

function tickGameOver() {

}

function tick() {
    if(currentGameState === gameStates.menu) {
        tickMenu();
    } else if(currentGameState === gameStates.inGame) {
        tickIngame();
    } else if(currentGameState === gameStates.gameOver) {
        tickGameOver();
    }

    if(debug.enabled) {
        debugMenuEl.hidden = false;
    } else {
        debugMenuEl.hidden = true;
    }
}

// ============================
// GAMELOOP
//============================

function loop(timeStamp) {
    // Calculate the number of milliseconds passed since the last frame
    const elapsed = timeStamp - oldTimeStamp;

    // Check if enough time has passed to meet the target FPS
    if (elapsed >= frameDelay) {
        // Update oldTimeStamp
        oldTimeStamp = timeStamp;

        // Calculate fps
        currentFPS = Math.round(1000 / elapsed);
        
        tick();
        draw();
    }

    // Request the next frame
    window.requestAnimationFrame(loop);
}

function init() {
    // set game dimensions
    canvas.width = gameWidth;
    canvas.height = gameHeight;

    switchGameStateToMenu();

    // start loop
    window.requestAnimationFrame(loop);
}

// ============================
// KEY LISTENING
//============================

function keysMenu() {
    // S Key pressed
    // start game
    if(keysPressed['s']) {
        switchGameStateToInGame();
    }
}

function keysIngame() {
    // W Key pressed
    // left pedal up
    if(keysPressed['w']) {
        if(!(leftPedalY < pixelSize)) {
            leftPedalY -= pixelSize * 2;
        }
    }
    // S Key pressed
    // left pedal down
    if(keysPressed['s']) {
        if(!(leftPedalY + pedalHeight >= gameHeight)) {
            leftPedalY += pixelSize * 2;
        }
    }
    // ArrowDown Key pressed
    // right pedal down
    if(keysPressed['ArrowDown']) {
        if(!(rightPedalY + pedalHeight >= gameHeight)) {
            rightPedalY += pixelSize * 2;
        }
    }
    // ArrowUp Key pressed
    // right pedal up
    if(keysPressed['ArrowUp']) {
        if(!(rightPedalY < pixelSize)) {
            rightPedalY -= pixelSize * 2;
        }
    }
     // ESC Key pressed
    // change gamestate to menu
    if(keysPressed['Escape']) {
        switchGameStateToMenu();
    }
}

function keysGameOver() {
    // M Key pressed
    // start menu
    if(keysPressed['m']) {
        switchGameStateToMenu();
    }
}

init();

// Keyboard listener
document.addEventListener("keydown", (event) => {
    // Set the state of the pressed key to true
    keysPressed[event.key] = true;

    if(currentGameState === gameStates.menu) {
        keysMenu();
    } else if(currentGameState === gameStates.inGame) {
       keysIngame();
    } else if(currentGameState === gameStates.gameOver) {
        keysGameOver();
    }

    // D + M Key pressed
    // toggle debug mode
    if(keysPressed['d'] && keysPressed['m']) {
        debug.enabled = !debug.enabled;
    }
});

document.addEventListener("keyup", (event) => {
    // Set the state of the released key to false
    keysPressed[event.key] = false;
});

// toggle debug grid
debugGridEl.addEventListener('click', () => {
    console.log(debug.grid)
    debug.grid = !debug.grid;
});