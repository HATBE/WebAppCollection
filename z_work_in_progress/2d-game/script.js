const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

let debug = false;

// ============================
// ABSTRACT CLASSES
// ============================

// abstract
class Entity {
    #x;
    #y;
    #maxHealth;
    #health;
    #width;
    #height;
    #speed;
    #isFreezed;
    #color;
    #name;

    constructor(x = 0,y = 0, width = 10, height = 10, maxHealth = 20, speed = 2, color = 'red', name = '') {
        if (this.constructor === Entity) {throw new Error("Abstract classes can't be instantiated.");}
        
        this.#x = x;
        this.#y = y;
        this.#height = height;
        this.#width = width;
        this.#maxHealth = maxHealth;
        this.#health = maxHealth;
        this.#speed = speed;
        this.#color = color;
        this.#isFreezed = false;
        this.#name = name;
    }

    tick() {throw new Error("Method 'tick()' must be implemented.");}
    draw() {throw new Error("Method 'draw()' must be implemented.");}

    getX() {
        return this.#x;
    }

    setX(x) { // input: int
        this.#x = x;
    } 
    
    getY() {
        return this.#y;
    }

    setY(y) { // input: int
        this.#y = y;
    }

    getWidth() {
        return this.#width;
    }

    getHeight() {
        return this.#height;
    }

    getMaxHealth() {
        return this.#maxHealth;
    }

    getSpeed() {
        return this.#speed;
    }

    setSpeed(speed) { // input: int
        this.#speed = speed;
    }

    isFreezed() {
        return this.#isFreezed;
    }

    setFreezed(isFreezed) { // input: boolean
        this.#isFreezed = isFreezed;
    }

    getColor() {
        return this.#color;
    }

    setColor(color) { // input: string (color)
        this.#color = color;
    }

    getHealth() {
        return this.#health;
    }

    setHealth(health) { // input: int
        // if health input <= 0 -> die
        if(health <= 0) {
            this.die();
            return;
        }
        // if health input > maxHealth -> health == maxHealth
        if(health >= this.#maxHealth) {
            this.#health = this.#maxHealth;
            return;
        }
        this.#health = health;
    }

    getName() {
        return this.#name;
    }
    
    setName(name) {
        this.#name = name;
    }

    addHealth(health) { // input: int
        this.setHealth(this.getHealth() + health);
    }

    removeHealth(health) {  // input: int
        this.setHealth(this.getHealth() - health);
    }

    getHealthPercentage() {
        return this.getHealth() / this.getMaxHealth() * 100;
    }

    die() {
        alert('player has died');
    }

    playerController(keysPressed) {
        if (this.isFreezed()) {
            return;
        }
    
        // initialize dx and dy to 0
        let dx = 0;
        let dy = 0;
    
        // calculate the direction based on the pressed keys
        if(keysPressed['w'] || keysPressed['ArrowUp']) {
            dy -= 1;
        }

        if(keysPressed['s'] || keysPressed['ArrowDown']) {
            dy += 1;
        }

        if(keysPressed['a'] || keysPressed['ArrowLeft']) {
            dx -= 1;
        }

        if(keysPressed['d'] || keysPressed['ArrowRight']) {
            dx += 1;
        }
    
        // calculate the length of the movement vector
        const length = Math.sqrt(dx * dx + dy * dy);
    
        // normalize the movement vector if it's not zero
        if (length !== 0) {
            dx = (dx / length) * this.getSpeed();
            dy = (dy / length) * this.getSpeed();
        }
    
        // calculate the new position
        let newX = this.getX() + dx;
        let newY = this.getY() + dy;
    
        // check for collisions with the game boundaries
        if (newX < 0) {
            newX = 0;
        } else if (newX + this.getWidth() > canvas.width) {
            newX = canvas.width - this.getWidth();
        }
    
        if (newY < 0) {
            newY = 0;
        } else if (newY + this.getHeight() > canvas.height) {
            newY = canvas.height - this.getHeight();
        }

        // update the player's position
        this.setX(newX);
        this.setY(newY);
    }

    getDistanceFromEntity(targetEntity) {
        // calculate the direction from this entity to the target entity
        const dx = targetEntity.getX() - this.getX()
        const dy = targetEntity.getY() - this.getY();

        // calculate the distance between the two entities
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        return distance;
    }

    followEntity(targetEntity) { // input: entity
        // calculate the direction from this entity to the target entity
        const dx = targetEntity.getX() - this.getX()
        const dy = targetEntity.getY() - this.getY();

        // calculate the distance between the two entities
        const distance = Math.sqrt(dx * dx + dy * dy);

        // normalize the direction vector
        const directionX = dx / distance;
        const directionY = dy / distance;

        // move this entity towards the target entity
        this.setX(this.getX() + directionX * this.getSpeed() / 2);
        this.setY(this.getY() + directionY * this.getSpeed() / 2);
    }

    _drawNameTag() {
        // name
        if(this.getName() != null) {
            const text = this.getName();
            ctx.fillStyle = 'white';
            ctx.font = "12px ARIAL";
            ctx.fillText(text, this.getX() - (ctx.measureText(text).width / 2) + this.getWidth() / 2, this.getY() - 5);
        }
    }

    _drawSelf() {
        DrawPreset.square(this.getX(), this.getY(), this.getWidth(), this.getHeight(), this.getColor());
    }
}

// abstract
class GameState {
    #GameStateManager;

    constructor(GameStateManager) {
        if (this.constructor === GameState) {throw new Error("Abstract classes can't be instantiated.")};

        this.#GameStateManager = GameStateManager;
    };

    start() {throw new Error("Method 'start()' must be implemented.");}
    stop() {throw new Error("Method 'stop()' must be implemented.");}

    tick() {throw new Error("Method 'tick()' must be implemented.");}
    draw() {throw new Error("Method 'draw()' must be implemented.");}

    keyboardEvents() {throw new Error("Method 'keyboardEvents()' must be implemented.");}

    getGameStateManager() {
        return this.#GameStateManager;
    }
}

// ============================
// CLASSES
// ============================

class DrawPreset {
    static square(x = 0, y = 0, width = 20, height = 20, color = 'white') {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }

    static clearRect(x, y, width, height) {
        ctx.clearRect(x, y, width, height);
    }

    static debugGrid() {
         // checkered pattern over whole background
        for(let y = 0; y < canvas.height; y += 10) {
            for(let x = 0; x < canvas.width; x += 10) {
                    ctx.fillStyle = x % (10 * 2) ^ y % (10 * 2) ? '#1c1c1c' : 'black';
                ctx.fillRect(x, y, 10, 10);
            }
        }

        // center crosshair
        ctx.fillStyle = 'red';
        ctx.fillRect(0, canvas.height / 2, canvas.width, 1);
        ctx.fillRect(canvas.width / 2, 0, 1, canvas.height);
    }
}

class Util {
    static doBoxesIntersect(box1X, box1Y, box1Height, box1Width, box2X, box2Y, box2Height, box2Width) {
        // calculate the right, left, top, and bottom coordinates of each box
        const box1Right = box1X + box1Width - 1;
        const box1Bottom = box1Y + box1Height - 1;
        const box2Right = box2X + box2Width - 1;
        const box2Bottom = box2Y + box2Height - 1;

        // check if box1 is to the left of box2
        if (box1Right < box2X || box2Right < box1X) {
            return false;
        }

        // check if box1 is above box2
        if (box1Bottom < box2Y || box2Bottom < box1Y) {
            return false;
        }

        // if none of the above conditions are met, the boxes intersect
        return true;
    }

    static doEntitiesIntersect(entity1, entity2) { // input: entity1, entity2
        return this.doBoxesIntersect(entity1.getX(), entity1.getY(), entity1.getHeight(), entity1.getWidth(), entity2.getX(), entity2.getY(), entity2.getHeight(), entity2.getWidth());
    }
}

class Game {
    #oldTimeStamp = 0;
    #targetFPS = 60;
    #frameDelay = 1000 / this.#targetFPS;
    #currentFPS;

    #gameWidth;
    #gameHeight;

    #GameStateManager;

    constructor(width, height) {
        this.#GameStateManager = new GameStateManager();

        this.#gameWidth = width;
        this.#gameHeight = height;
    }

    #setupCanvas() {
        canvas.height = this.#gameHeight;
        canvas.width = this.#gameWidth;
    }

    #loop(timeStamp) {
        // Calculate the number of milliseconds passed since the last frame
        const elapsed = timeStamp - this.#oldTimeStamp;

        // Check if enough time has passed to meet the target FPS
        if (elapsed >= this.#frameDelay) {
            // Update oldTimeStamp
            this.#oldTimeStamp = timeStamp;

            // Calculate fps
            this.#currentFPS = Math.round(1000 / elapsed);
            
            // tick game
            this.#tick();

            // draw game
            this.#draw();
        }

        // Request the next frame
        window.requestAnimationFrame((timeStamp) => {this.#loop(timeStamp)});
    }

    #saveToMemory() {
        // save to memory
    }

    #loadFromMemory() {
        // load from memory
    }

    #tick() {
        // tick current gameState
       this.#GameStateManager.getCurrentGameState().tick(); 
    }

    #draw() {
        // clear screen
        DrawPreset.clearRect();

        // make default dark background
        DrawPreset.square(0, 0, this.#gameWidth, this.#gameHeight, 'black');

        // draw debug grid
        if(debug) {
            DrawPreset.debugGrid();
        }
        
        // draw current gameState
        this.#GameStateManager.getCurrentGameState().draw(); 
    }

    start() {
        // setup canvas
        this.#setupCanvas();
        
        // switch to default gamestate -> menu
        this.#GameStateManager.switchGameState(this.#GameStateManager.gameStates.menu);

        // start game loop
        window.requestAnimationFrame((timeStamp) => {this.#loop(timeStamp)});
    }
}

// ============================
// Entities 

class Player extends Entity {
    tick() {

    }

    draw() {
        this._drawSelf();
        this._drawNameTag();
    }
}

class Enemy extends Entity {
    #attackCooldown;

    constructor(x = 0,y = 0, width = 10, height = 10, maxHealth = 20, speed = 2, color = 'red', name = '', attackCooldown = 1000) {
        super(x, y, width, height, maxHealth, speed, color, name);

        this.#attackCooldown = attackCooldown;
    }

    tick() {

    }

    draw() {
        this._drawSelf();
        this._drawNameTag();
    }

    attackEntiy(targetEntity) {

    }
 
}

// ============================
// GAME STATES

class GameStateManager {
    #currentGameState = null;
    #keysPressed = {};

    constructor() {
        this.keyboardEvents();
    }

    gameStates = {
        menu: MenuState,
        inGame: InGameState,
        gameOver: GameOverState
    }

    switchGameState(gameState) {
        if(this.#currentGameState) {
            this.#currentGameState.stop();
        }
        this.#currentGameState = new gameState(this);
        this.#currentGameState.start();
    }

    getCurrentGameState() {
        return this.#currentGameState;
    }

    keyboardEvents() {
        document.addEventListener("keydown", (event) => {
            // Set the state of the pressed key to true
            this.#keysPressed[event.key] = true;
            if (this.#currentGameState) {
                this.#currentGameState.keyboardEvents(this.#keysPressed);
            }

            // D + M Key pressed
            // toggle debug mode
            if(this.#keysPressed['d'] && this.#keysPressed['m']) {
                debug = !debug;
            }
        });
        document.addEventListener("keyup", (event) => {
            // Set the state of the released key to false
            this.#keysPressed[event.key] = false;
             if (this.#currentGameState) {
                this.#currentGameState.keyboardEvents(this.#keysPressed);
            }
        });
    }
}

class MenuState extends GameState {
    start() {

    }

    stop() {

    }

    tick() {

    }

    draw() {
        // title
        const gameTitleText = 'Maze Game';
        ctx.fillStyle = '#2c79ff';
        ctx.font = "72px ARIAL"
        ctx.fillText(gameTitleText, canvas.width / 2 - ctx.measureText(gameTitleText).width / 2, canvas.height / 2 + 26);

        // subtitle
        const startGameText = 'Press "S" to start the game.';
        ctx.fillStyle = 'white';
        ctx.font = "25px ARIAL";
        ctx.fillText(startGameText, canvas.width / 2 - ctx.measureText(startGameText).width / 2,  canvas.height / 2 + 60);
        const escapeGameText = 'Press "ESC" to go to the main menu again.'
        ctx.font = "20px ARIAL";
        ctx.fillText(escapeGameText, canvas.width / 2 - ctx.measureText(escapeGameText).width / 2, canvas.height - 10);

        // copyright
        const copyrightText = '©2023 by HATBE';
        ctx.fillStyle = '#2c79ff';
        ctx.font = "11px ARIAL";
        ctx.fillText(copyrightText, canvas.width - ctx.measureText(copyrightText).width - 10, canvas.height - 10);
    }

    keyboardEvents(keysPressed) {
        // change gamestate to inGame
        if(keysPressed['s']) {
            this.getGameStateManager().switchGameState(this.getGameStateManager().gameStates.inGame);
        }
    }
}

class InGameState extends GameState {
    #player;
    #enemy;

    start() {
        this.#player = new Player((canvas.width / 2) - (20 / 2), (canvas.height / 2) - (20 / 2), 20, 20, 20, 5, 'red', 'User');
        this.#enemy = new Enemy(200, 200, 20, 20, 10, 2, 'green', 'Enemy', 1000);

        
    }

    stop() {

    }

    tick() {
        const distancePlayerEnemy = this.#enemy.getDistanceFromEntity(this.#player);
        const playerAndEnemyIntersect = Util.doEntitiesIntersect(this.#player, this.#enemy);

        this.#player.tick();

        if(!playerAndEnemyIntersect && distancePlayerEnemy <= 300) {
            this.#enemy.tick();
            this.#enemy.followEntity(this.#player)
        }

        if(playerAndEnemyIntersect) {
            this.#player.removeHealth(0.5)
        }
    }

    draw() {
        const distancePlayerEnemy = this.#enemy.getDistanceFromEntity(this.#player);
        const playerAndEnemyIntersect = Util.doEntitiesIntersect(this.#player, this.#enemy);
        this.#player.draw();

        if(!playerAndEnemyIntersect && distancePlayerEnemy <= 300) {
            this.#enemy.draw();
        }

        if(playerAndEnemyIntersect) {
            ctx.fillStyle = 'red';
            ctx.font = "20px ARIAL";
            ctx.fillText(`Intersects`, 500, 350);
        }

        // print distance
        ctx.fillStyle = distancePlayerEnemy >= 300 ? 'red' : 'green';
        ctx.font = "20px ARIAL";
        ctx.fillText(Math.floor(distancePlayerEnemy), this.#enemy.getX() + 80, this.#enemy.getY());

        // print line between player and enemy
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.#enemy.getX() + this.#enemy.getWidth() / 2, this.#enemy.getY() + this.#enemy.getHeight() / 2);
        ctx.lineTo(this.#player.getX() + this.#player.getWidth() / 2, this.#player.getY() + this.#player.getHeight() / 2);
        ctx.stroke();


        // draw Health
        ctx.fillStyle = 'red';
        ctx.font = "20px ARIAL";
        ctx.fillText(this.#player.getHealth(), 0, 20);
    }

    keyboardEvents(keysPressed) {
        // change gamestate to menu
        if(keysPressed['Escape']) {
            this.getGameStateManager().switchGameState(this.getGameStateManager().gameStates.menu);
        }
        this.#player.playerController(keysPressed);
    }
}

class GameOverState extends GameState {
    start() {

    }

    stop() {

    }

    tick() {

    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.font = '72px Arial';
        const gameOverText = 'Game Over';
        ctx.fillText(gameOverText, canvas.width / 2 - ctx.measureText(gameOverText).width / 2, canvas.height / 2 + 26);
    }

    keyboardEvents(keysPressed) {
        // change gamestate to menu
        if(keysPressed['Escape']) {
            this.getGameStateManager().switchGameState(this.getGameStateManager().gameStates.menu);
        }
    }
}

// ============================
// GAME
// ============================

// initialize Game
const game = new Game(1280, 720);
game.start();