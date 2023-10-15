const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

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
    #stepSize;

    constructor(x = 0,y = 0, width = 10, height = 10, maxHealth = 20, stepSize = 2) {
        if (this.constructor === Entity) {throw new Error("Abstract classes can't be instantiated.");}
        
        this.#x = x;
        this.#y = y;
        this.#height = height;
        this.#width = width;
        this.#maxHealth = maxHealth;
        this.#health = maxHealth;
        this.#stepSize = stepSize;
    }

    tick() {throw new Error("Method 'tick()' must be implemented.");}
    draw() {throw new Error("Method 'draw()' must be implemented.");}

    getX() {return this.#x;}
    setX(x) {this.#x = x;}
    getY() {return this.#y;}
    setY(y) {this.#y = y;}
    getWidth() {return this.#width;}
    getHeight() {return this.#height;}
    getMaxHealth() {return this.#maxHealth;}
    getStepSize(){return this.#stepSize;}
    setStepSize(stepSize){this.#stepSize = stepSize;}
    getHealth() {return this.#health;}
    setHealth(health) {
        // if health input <= 0 -> die
        if(health <= 0) {
            this.#die();
            return;
        }
        // if health input > maxHealth -> health == maxHealth
        if(health >= this.#maxHealth) {
            this.#health = this.#maxHealth;
            return;
        }
        this.#health = health;
    }

    addHealth(health) {
        this.setHealth(this.getHealth() + health);
    }

    removeHealth(health) {

        this.setHealth(this.getHealth() - health);
    }

    #die() {
        alert('player has died');
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

    keyboardListeners() {throw new Error("Method 'keyboardListeners()' must be implemented.");}

    getGameStateManager() {
        return this.#GameStateManager;
    }
}

// ============================
// CLASSES
// ============================

class Util {
    static doBoxesIntersects(box1X, box1Y, box1Height, box1Width, box2X, box2Y, box2Height, box2Width) {
        // Calculate the right, left, top, and bottom coordinates of each box
        const box1Right = box1X + box1Width - 1;
        const box1Bottom = box1Y + box1Height - 1;
        const box2Right = box2X + box2Width - 1;
        const box2Bottom = box2Y + box2Height - 1;

        // Check if box1 is to the left of box2
        if (box1Right < box2X || box2Right < box1X) {
            return false;
        }

        // Check if box1 is above box2
        if (box1Bottom < box2Y || box2Bottom < box1Y) {
            return false;
        }

        // If none of the above conditions are met, the boxes intersect
        return true;
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
            
            this.#tick();
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
       this.#GameStateManager.getCurrentGameState().tick(); 
    }

    #draw() {
        ctx.clearRect(0, 0, this.#gameWidth, this.#gameHeight);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this.#gameWidth, this.#gameHeight);
        this.#GameStateManager.getCurrentGameState().draw(); 
    }

    start() {
        this.#setupCanvas();
        this.#GameStateManager.switchGameState(this.#GameStateManager.gameStates.menu);
        window.requestAnimationFrame((timeStamp) => {this.#loop(timeStamp)});
    }
}

class GameStateManager {
    #currentGameState = null;
    #keysPressed = {};

    constructor() {
        this.keyboardListeners();
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

    keyboardListeners() {
        document.addEventListener("keydown", (event) => {
            // Set the state of the pressed key to true
            this.#keysPressed[event.key] = true;
            this.#currentGameState.keyboardListeners(this.#keysPressed);
        });
        document.addEventListener("keyup", (event) => {
            // Set the state of the released key to false
            this.#keysPressed[event.key] = false;
        });
    }
}

// ============================
// GAME STATES

class MenuState extends GameState {
    start() {

    }

    stop() {

    }

    tick() {

    }

    draw() {
        ctx.fillStyle = '#2c79ff';
        ctx.font = "50px ARIAL";
        ctx.fillText(`Menu`, 0, 50);
        ctx.fillStyle = '#33caff';
        ctx.font = "25px ARIAL";
        ctx.fillText('- Press "S" to start', 0, 80);
        ctx.fillText('- Press "ESC" to escape game', 0, 110);
    }

    keyboardListeners(keysPressed) {
        // change gamestate to inGame
        if(keysPressed['s']) {
            this.getGameStateManager().switchGameState(this.getGameStateManager().gameStates.inGame);
        }
    }
}

class InGameState extends GameState {
    #player;

    start() {
        const playerWidth = 20;
        const playerHeight = 20;
        const xCenter = (canvas.width / 2) - (playerWidth / 2);
        const yCenter = (canvas.height / 2) - (playerHeight / 2);
        this.#player = new Player(xCenter, yCenter, playerWidth, playerHeight, 20, 5);
    }

    stop() {

    }

    tick() {
        this.#player.tick();
    }

    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(500, 400, 20, 20);

        if(Util.doBoxesIntersects(this.#player.getX(), this.#player.getY(), this.#player.getHeight(), this.#player.getWidth(),500, 400, 20, 20)) {
            /*ctx.fillStyle = 'red';
            ctx.font = "20px ARIAL";
            ctx.fillText(`Intersects`, 500, 350);*/
            this.getGameStateManager().switchGameState(this.getGameStateManager().gameStates.gameOver);
        }

        this.#player.draw();
    }

    keyboardListeners(keysPressed) {
        // change gamestate to menu
        if(keysPressed['Escape']) {
            this.getGameStateManager().switchGameState(this.getGameStateManager().gameStates.menu);
        }
        // walk to top
        if(keysPressed['w']) {
            if(this.#player.getY() - this.#player.getStepSize() <= 0) { // intersecting top
                this.#player.setY(0);
                return;
            }
            this.#player.setY(this.#player.getY() - this.#player.getStepSize());
        }
        // walk to bottom
        if(keysPressed['s']) {
            if(this.#player.getY() + this.#player.getStepSize() >= canvas.height - this.#player.getHeight()) { // intersecting bottom
                this.#player.setY(canvas.height - this.#player.getHeight());
                return;
            }
            this.#player.setY(this.#player.getY() + this.#player.getStepSize());
        }
        // walk to left
        if(keysPressed['a']) {
            if(this.#player.getX() - this.#player.getStepSize() <= 0) { // intersecting left
                this.#player.setX(0);
                return;
            }
            this.#player.setX(this.#player.getX() - this.#player.getStepSize());
        }
        // walk to right
        if(keysPressed['d']) {
            if(this.#player.getX() + this.#player.getStepSize() >= canvas.width - this.#player.getWidth()) { // intersecting right
                this.#player.setX(canvas.width - this.#player.getWidth());
                return;
            }
            this.#player.setX(this.#player.getX() + this.#player.getStepSize());
        }
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
        ctx.font = '50px Arial';
        const gameOverText = 'GameOver';
        ctx.fillText(gameOverText, canvas.width / 2 - ctx.measureText(gameOverText).width / 2, canvas.height / 2 + 25);
    }

    keyboardListeners(keysPressed) {
        // change gamestate to menu
        if(keysPressed['Escape']) {
            this.getGameStateManager().switchGameState(this.getGameStateManager().gameStates.menu);
        }
    }
}

// ============================
// Entities 

class Player extends Entity {
    tick() {

    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());

        ctx.fillStyle = 'blue';
        ctx.fillRect(this.getX(), this.getY(), 2, 2);
    }
}

// ============================
// GAME
// ============================

// Initialize Game
const game = new Game(1280, 720);
game.start();