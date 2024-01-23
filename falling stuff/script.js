const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 720;
canvas.height = 480;

keysPressed = {};

player = {
    speed: 2.5,
    height: 20,
    width: 20,
    x: 0,
    y: 0,
}

stones = [
    {x: 60, y: 0, speed: 1},
    {x: 200, y: 0, speed: 2}
];

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

function drawStones() {
    if(!stones) {return;}

    stones.forEach((stone) => {
        ctx.fillStyle = 'black';
        ctx.fillRect(stone.x, stone.y, 10, 10);
    });
}

function tickStones() {
    if(!stones) {return;}

    stones.forEach((stone) => {
        stone.y += stone.speed;

        if(doRectsIntersect(stone.x, stone.y, 10 , 10, player.x, player.y, player.width, player.height)) {
            console.log('end');
            return;
        }
    });

    
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
        // shoot missile
    }
}

function tick() {
   playerController();
   tickStones();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawStones();
}

function gameLoop(timeStamp) {
    tick();
    draw();
    
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