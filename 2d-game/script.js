// ============================
// ABSTRACT CLASSES
//============================

// abstract
class Entity {
    #posX = 0;
    #posY = 0;
    #maxHealth;
    #health;

    constructor(maxHealth = 20) {
        if (this.constructor == Entity) {throw new Error("Abstract classes can't be instantiated.");}
        
        this.#maxHealth = maxHealth;
        this.#health = maxHealth;
    }

    tick() {throw new Error("Method 'tick()' must be implemented.");}
    render() {throw new Error("Method 'render()' must be implemented.");}

    getX() {return this.#posX;}
    setX(x) {this.#posX = x;}
    getY() {return this.#posY;}
    setY(y) {this.#posY = y;}
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
        alert('die');
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

    #canvas;
    #ctx;

    #gameWidth;
    #gameHeight;

    #currentGameState;

    constructor(width, height) {
        this.#gameWidth = width;
        this.#gameHeight = height;
    }

    #setupCanvas() {
        this.#canvas = document.getElementById('canvas');
        this.#ctx = this.#canvas.getContext("2d");

        this.#canvas.height = this.#gameHeight;
        this.#canvas.width = this.#gameWidth;
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
        
    }

    #render() {
        
    }

    start() {
        this.#setupCanvas();
        window.requestAnimationFrame((timeStamp) => {this.#loop(timeStamp)});
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

    constructor() {
        super();
        this.#player = new Player(20);
    }

    start() {

    }

    stop() {

    }

    tick() {
        this.#player.tick();
    }

    render() {
        this.#player.render();
    }
}

// ============================
// Entities 

class Player extends Entity {
    constructor(maxHealth) {
        super(maxHealth);
    }
    
    tick() {
        console.log(this.getHealth());
    }

    render() {
        
    }
}

// ============================
// GAME
//============================

const game = new Game(1280, 720);
game.start();