// ============================
// ABSTRACT CLASSES
//============================

// abstract
class Entity {
    #posX;
    #posY;
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
         // if health input <= 0 -> health = 0
        if(health <= 0) {
            this.#health = 0;
            return;
        }
        // if health input > maxHealth -> health = maxHealth
        if(health > this.#maxHealth) {
            this.#health = this.#maxHealth;
            return;
        }
        this.#health = health;
    }
}

// abstract
class GameState {
    constructor() {if (this.constructor == GameState) {throw new Error("Abstract classes can't be instantiated.");}}

    tick() {throw new Error("Method 'tick()' must be implemented.");}
    render() {throw new Error("Method 'render()' must be implemented.");}
}

// ============================
// CLASSES
//============================

class Game {
    #player;

    #oldTimeStamp = 0;
    #targetFPS = 60;
    #frameDelay = 1000 / this.#targetFPS;
    #currentFPS;

    constructor() {
        this.#player = new Player(20);
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
        this.#player.tick();
    }

    #render() {
        this.#player.render();
    }

    start() {
        window.requestAnimationFrame((timeStamp) => {this.#loop(timeStamp)});
    }
}

// ============================
// GAME STATES

class MenuState extends GameState {

}

class InGameState extends GameState {

}

// ============================
// Entities 

class Player extends Entity {
    constructor(maxHealth) {
        super(maxHealth);
    }
    
    tick() {
        this.setHealth(20);
        console.log(this.getHealth());
    }

    render() {
        
    }
}

// ============================
// GAME
//============================

const game = new Game();
game.start();