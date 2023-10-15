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
    #speed;
    #isFreezed;
    #color;
    #dx;
    #dy;
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
        this.#dx = 0;
        this.#dy = 0;
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

    getDx() {
        return this.#dx;
    }

    setDx(dx) { // input: int
        this.#dx = dx;
    }

    getDy() {
        return this.#dy;
    }

    setDy(dy) { // input:  int
        this.#dy = dy;
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
        if (keysPressed['w']) {
            dy -= 1;
        }
        if (keysPressed['s']) {
            dy += 1;
        }
        if (keysPressed['a']) {
            dx -= 1;
        }
        if (keysPressed['d']) {
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
    
        // update dx and dy
        this.setDx(dx);
        this.setDy(dy);
    
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

// ============================
// Entities 

class Player extends Entity {
    tick() {

    }

    draw() {
        // square
        ctx.fillStyle = this.getColor();
        ctx.fillRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());

        this._drawNameTag();
    }
}

class Enemy extends Entity {
    tick() {

    }

    draw() {
        // square
        ctx.fillStyle = this.getColor();
        ctx.fillRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());

        this._drawNameTag();
    }
}

// ============================
// GAME STATES

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
            if (this.#currentGameState) {
                this.#currentGameState.keyboardListeners(this.#keysPressed);
            }
        });
        document.addEventListener("keyup", (event) => {
            // Set the state of the released key to false
            this.#keysPressed[event.key] = false;
             if (this.#currentGameState) {
                this.#currentGameState.keyboardListeners(this.#keysPressed);
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
    #enemy;

    #testX = 400;
    #testY = 500;

    start() {
        this.#player = new Player((canvas.width / 2) - (20 / 2), (canvas.height / 2) - (20 / 2), 20, 20, 20, 5, 'red', 'User');
        this.#enemy = new Enemy(200, 200, 20, 20, 10, 2, 'green', 'Enemy');
    }

    stop() {

    }

    tick() {
        const distancePlayerEnemy = this.#enemy.getDistanceFromEntity(this.#player);
        const playerAndEnemyIntersect = Util.doEntitiesIntersect(this.#player, this.#enemy);

        this.#enemy.tick();
        this.#player.tick();

        if(!playerAndEnemyIntersect && distancePlayerEnemy <= 300) {
            this.#enemy.followEntity(this.#player)
        }

        if(playerAndEnemyIntersect) {
            this.#player.setFreezed(true);
            this.getGameStateManager().switchGameState(this.getGameStateManager().gameStates.gameOver);
        }
    }

    draw() {
        const distancePlayerEnemy = this.#enemy.getDistanceFromEntity(this.#player);

        this.#enemy.draw();
        this.#player.draw();

        if(Util.doEntitiesIntersect(this.#player, this.#enemy)) {
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
    }

    keyboardListeners(keysPressed) {
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
        ctx.font = '50px Arial';
        const gameOverText = 'Game Over';
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
// GAME
// ============================

// initialize Game
const game = new Game(1280, 720);
game.start();