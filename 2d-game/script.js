const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

// ============================
// ABSTRACT CLASSES
//============================

// abstract
class Entity {
    #x;
    #y;
    #maxHealth;
    #health;
    #width;
    #height;

    constructor(x = 0,y = 0, width = 10, height = 10, maxHealth = 20) {
        if (this.constructor == Entity) {throw new Error("Abstract classes can't be instantiated.");}
        
        this.#x = x;
        this.#y = y;
        this.#height = height;
        this.#width = width;
        this.#maxHealth = maxHealth;
        this.#health = maxHealth;
    }

    tick() {throw new Error("Method 'tick()' must be implemented.");}
    render() {throw new Error("Method 'render()' must be implemented.");}

    getX() {return this.#x;}
    setX(x) {this.#x = x;}
    getY() {return this.#y;}
    setY(y) {this.#y = y;}
    getWidth() {return this.#width;}
    getHeight() {return this.#height;}
    getHealth() {return this.#health;}
    getMaxHealth() {return this.#maxHealth;}

    setHealth(health) {
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

    addHealth(health) {
        this.setHealth(this.getHealth() + health);
    }

    removeHealth(health) {
        this.setHealth(this.getHealth() - health);
    }

    die() {
        alert('player has died');
    }
}

// abstract
class GameState {
    constructor() {if (this.constructor == GameState) {throw new Error("Abstract classes can't be instantiated.");}}

    start() {throw new Error("Method 'start()' must be implemented.");}
    stop() {throw new Error("Method 'stop()' must be implemented.");}

    tick() {throw new Error("Method 'tick()' must be implemented.");}
    render() {throw new Error("Method 'render()' must be implemented.");}
}

// ============================
// CLASSES
//============================

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
            this.#render();
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

    #render() {
        ctx.clearRect(0, 0, this.#gameWidth, this.#gameHeight);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, this.#gameWidth, this.#gameHeight);
        this.#GameStateManager.getCurrentGameState().render(); 
    }

    start() {
        this.#setupCanvas();
        this.#GameStateManager.switchGameState(this.#GameStateManager.gameStates.inGame); // TODO: change to menu 
        window.requestAnimationFrame((timeStamp) => {this.#loop(timeStamp)});
    }
}

class GameStateManager {
    #currentGameState = null;

    gameStates = {
        menu: MenuState,
        inGame: InGameState,
        gameOver: GameOverState
    }

    switchGameState(gameState) {
        if(this.#currentGameState) {
            this.#currentGameState.stop();
        }
        this.#currentGameState = new gameState;
        this.#currentGameState.start();
    }

    getCurrentGameState() {
        return this.#currentGameState;
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

    render() {

    }
}

class InGameState extends GameState {
    #player;

    start() {
        this.#player = new Player(0, 0, 10, 10, 20);
    }

    stop() {

    }

    tick() {
        this.#player.setX(this.#player.getX() + 1)
        this.#player.setY(this.#player.getY() + 1)
        this.#player.tick();
    }

    render() {

        this.#player.render();
    }
}

class GameOverState extends GameState {
    start() {

    }

    stop() {

    }

    tick() {

    }

    render() {

    }
}

// ============================
// Entities 

class Player extends Entity {
    constructor(maxHealth) {
        super(maxHealth);
    }
    
    tick() {

    }

    render() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
    }
}

// ============================
// GAME
//============================

// Initialize Game
const game = new Game(1280, 720);
game.start();