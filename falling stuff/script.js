// TODO: wave system
// TODO: add hitbox (smaller then entity itself)

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
        return this.doBoxesIntersect(entity1.getLocation().getX(), entity1.getLocation().getY(), entity1.getHeight(), entity1.getWidth(), entity2.getLocation().getX(), entity2.getLocation().getY(), entity2.getHeight(), entity2.getWidth());
    }
}

class Location {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    getX() {
        return this.#x;
    }

    setX(x) {
        this.#x = x;
    }

    getY() {
        return this.#y;
    }

    setY(y) { 
        this.#y = y;
    }
}

class Sprite {
    #image;

    constructor(path, width, height) {
        this.#image = new Image(width, height);
        this.#image.src = path;

        return this.#image;
    }
}

class MissileManager {
    _game;

    #missileSpawnDelay = 20; // in frames (60 = approx every sec.)
    
    #missiles = [];
    #missileDelayCounter = 0;

    constructor(game) {
        this._game = game;
    }

    tick() {
        if(!this.#missiles) {return;}

        this.#missiles.forEach((missile, missileIdx) => {
            missile.tick();

            this._game.getGameStateManager().getCurrentGameState().getStoneManager().getStones().forEach((stone, stoneIdx) => {
                if(Util.doEntitiesIntersect(missile, stone)) {
                    this._game.getGameStateManager().getCurrentGameState().getStoneManager().removeStone(stone);
                    this.removeMissile(missile)
                    this._game.getGameStateManager().getCurrentGameState().increesePoints();
                }
            });
        });

        if(this.#missileDelayCounter > 0) {
            this.#missileDelayCounter--;
        }
    }

    draw(canvas) {
        if(!this.#missiles) {return;}

        this.#missiles.forEach((missile) => {
           missile.draw(canvas);
        });
    }

    createMissile(player) {
        if(this.#missileDelayCounter <= 0) {
            this.#missileDelayCounter = this.#missileSpawnDelay;
            this.#missiles.push(new Missile(this._game, player.getLocation().getX() + (player.getWidth() / 2), player.getLocation().getY()));
        }
    }

    removeMissile(missile) {
        this.#missiles.splice(this.#missiles.indexOf(missile), 1);
    }

    removeAllMissiles() {
        this.#missiles = [];
    }

    getMissileDelayCounter() {
        return this.#missileDelayCounter;
    }
}

class StoneManager {
    _game;

    #stoneSpawnDelay = 30; // in frames (60 = approx every sec.)
    
    #stones = [];
    #stoneDelayCounter = 0;

    constructor(game) {
        this._game = game;
    }

    tick() {
        if(!this.#stones) {return;}

        this.#stones.forEach((stone, stoneIdx) => {
           stone.tick();
        
            // check if stones collide with player
            if(Util.doEntitiesIntersect(stone, this._game.getGameStateManager().getCurrentGameState().getPlayer())) {
                this._game.getGameStateManager().getCurrentGameState().getStoneManager().removeStone(this);
                this._game.getGameStateManager().getCurrentGameState().gameOver();
                return;
            }
        });

        // create new Stone
        this.#stoneDelayCounter--;
        if(this.#stoneDelayCounter <= 0) {
            this.#stoneDelayCounter = this.#stoneSpawnDelay;
            this.createStone();
        }
    }

    draw(canvas) {
        if(!this.#stones) {return;}

        this.#stones.forEach((stone) => {
           stone.draw(canvas);
        });
    }

    createStone() {
        this.#stoneDelayCounter = this.#stoneSpawnDelay;

        const randomX = Math.floor(Math.random() * (canvas.width)) + 1; // generates a random integer from 1 to canvas.width
        const randomSpeed = Math.round(((Math.random() * 2) + 1) * 10) / 10; // random decimal between 1.0 and 3.0, rounded to 1 decimal place.

        this.#stones.push(new Stone(this._game, randomX, 0, randomSpeed));
    }

    removeStone(stone) {
        this.#stones.splice(this.#stones.indexOf(stone), 1);
    }

    removeAllStones() {
        this.#stones = [];
    }

    getStones() {
        return this.#stones;
    }
}

// ============================
// Entities 

class Entity {
    _game;
    #location;
    #width;
    #height;
    #speed;

    constructor(_game, x = 0,y = 0, width = 10, height = 10, speed = 2) {
        if (this.constructor === Entity) {throw new Error("Abstract classes can't be instantiated.");}
        
        this._game = game;
        this.#location = new Location(x, y);
        this.#height = height;
        this.#width = width;
        this.#speed = speed;
    }

    tick() {throw new Error("Method 'tick()' must be implemented.");}
    draw(canvas) {throw new Error("Method 'draw()' must be implemented.");}

    getLocation() {
        return this.#location;
    }

    getWidth() {
        return this.#width;
    }

    getHeight() {
        return this.#height;
    }

    getSpeed() {
        return this.#speed;
    }

    setSpeed(speed) {
        this.#speed = speed;
    }

    drawDebug(canvas) {
        canvas.drawStroke(this.getLocation().getX(), this.getLocation().getY(), this.getWidth(), this.getHeight(), "red");
    }
}

class Player extends Entity {
    #sprite;

    constructor(game, x, y, width, height, speed) {
        super(game, x, y, width, height, speed);
        this.#sprite = new Sprite("ufo.png", this.getWidth(), this.getHeight());
    }

    tick() {
        
    }

    draw(canvas) {
        canvas.getContext().drawImage(this.getSprite(), this.getLocation().getX(), this.getLocation().getY(), this.getWidth(), this.getHeight());
                
        if(this._game.isDebugMode()) {
            this.drawDebug(canvas);
        }
    }

    getSprite() {
        return this.#sprite;
    }

    playerController() {
        // move left
        if(this._game.getGameStateManager().isKeyPressed('a') || this._game.getGameStateManager().isKeyPressed('A') || this._game.getGameStateManager().isKeyPressed('ArrowLeft')) { 
            if(this.getLocation().getX() - this.getSpeed() <= 0) {
                this.getLocation().setX(0);
            } else {
                this.getLocation().setX(this.getLocation().getX() - this.getSpeed());
            }
        }
    
        // move right
        if(this._game.getGameStateManager().isKeyPressed('d') || this._game.getGameStateManager().isKeyPressed('D') || this._game.getGameStateManager().isKeyPressed('ArrowRight')) {
            if(this.getLocation().getX() + this.getSpeed() > this._game.getCanvas().getWidth() +- this.getWidth()) {
                this.getLocation().setX(this._game.getCanvas().getWidth() - this.getWidth());
            } else {
                this.getLocation().setX(this.getLocation().getX() + this.getSpeed())
            }
        }
    
        // shoot missile
        if(this._game.getGameStateManager().isKeyPressed(' ') || this._game.getGameStateManager().isKeyPressed('ArrowUp')) {
            this._game.getGameStateManager().getCurrentGameState().getMissileManager().createMissile(this);
        }
    }

    drawDebug(canvas) {
        super.drawDebug(canvas);
        canvas.getContext().lineWidth = 1;
        canvas.getContext().beginPath(); 
        canvas.getContext().moveTo(this.getLocation().getX() + (this.getWidth() / 2), this.getLocation().getY()); 
        canvas.getContext().lineTo(this.getLocation().getX() + (this.getWidth() / 2), 0); canvas.getContext().stroke();
    }
}

class Stone extends Entity {
    #sprite;

    constructor(game, x, y, speed) {
        super(game, x, y, 80, 80, speed);
        this.#sprite = new Sprite("stone.png", this.getWidth(), this.getHeight());
    }

    tick() {
        this.getLocation().setY(this.getLocation().getY() + this.getSpeed());

        if(this.getLocation().getY() > this._game.getCanvas().getHeight()) {
            this._game.getGameStateManager().getCurrentGameState().getStoneManager().removeStone(this);
        }
    }

    draw(canvas) {
        canvas.getContext().drawImage(this.getSprite(), this.getLocation().getX(), this.getLocation().getY(), this.getWidth(), this.getHeight());

        if(this._game.isDebugMode()) {
            this.drawDebug(canvas);
        }
    }

    getSprite() {
        return this.#sprite;
    }
}

class Missile extends Entity {
    constructor(game, x, y) {
        super(game, x, y, 8, 20, 15);
        this.getLocation().setX(x - (this.getWidth() / 2)); // correct x position, minus half of missile width
    }

    tick() {
        this.getLocation().setY(this.getLocation().getY() - this.getSpeed());

        // check if missile leaves screen on the top
        if(this.getLocation().getY() <= 0 - this.getHeight()) {
            this._game.getGameStateManager().getCurrentGameState().getMissileManager().removeMissile(this);
        }
    }

    draw(canvas) {
        canvas.getContext().fillStyle = 'yellow';
        canvas.getContext().fillRect(this.getLocation().getX(), this.getLocation().getY(), this.getWidth(), this.getHeight());
    }
}


// ============================
// GAME STATES

class GameState {
    _game;
    constructor(game) {
        if (this.constructor === GameState) {throw new Error("Abstract classes can't be instantiated.")};

        this._game = game;
    };

    start() {throw new Error("Method 'start()' must be implemented.");}
    stop() {throw new Error("Method 'stop()' must be implemented.");}

    tick() {throw new Error("Method 'tick()' must be implemented.");}
    draw(canvas) {throw new Error("Method 'draw()' must be implemented.");}

    _tickKeyboard() {throw new Error("Method 'tickKeyboard()' must be implemented.");}
}

class MenuState extends GameState {
    start() {

    }

    stop() {

    }

    tick() {
        this._tickKeyboard();
    }

    draw(canvas) {
        // title
        const gameTitleText = 'Falling Stuff';
        canvas.getContext().fillStyle = '#2c79ff';
        canvas.getContext().font = "72px ARIAL"
        canvas.getContext().fillText(gameTitleText, canvas.getWidth() / 2 - canvas.getContext().measureText(gameTitleText).width / 2, canvas.getHeight() / 2 + 26);

        // subtitle
        const startGameText = 'Press "S" to start the game.';
        canvas.getContext().font = "25px ARIAL";
        canvas.getContext().fillText(startGameText, canvas.getWidth() / 2 - canvas.getContext().measureText(startGameText).width / 2,  canvas.getHeight() / 2 + 60);
        const escapeGameText = 'Press "ESC" to go back to the main menu again.'
        canvas.getContext().font = "20px ARIAL";
        canvas.getContext().fillText(escapeGameText, canvas.width / 2 - canvas.getContext().measureText(escapeGameText).width / 2, canvas.height - 10);

        // copyright
        const copyrightText = '©2024 by HATBE';
        canvas.getContext().font = "11px ARIAL";
        canvas.getContext().fillText(copyrightText, canvas.getWidth() - canvas.getContext().measureText(copyrightText).width - 10, canvas.getHeight() - 10);
    }

    _tickKeyboard() {
        // change gamestate to inGame
        if(this._game.getGameStateManager().isKeyPressed('s')) {
            this._game.getGameStateManager().switchGameState(this._game.getGameStateManager().gameStates.inGame);
        }
    }
}

class InGameState extends GameState {
    #player;
    #backgroundImage;

    #isGameOver = false;

    #missileManager;
    #stoneManager;

    #points = 0;

    constructor(game) {
        super(game);

        this.#backgroundImage = new Sprite("space.jpg", this._game.getCanvas().getWidth(), this._game.getCanvas().getHeight());
        this.#player = new Player(this._game, 0, 0, 70, 50, 5);

        this.#missileManager = new MissileManager(this._game);
        this.#stoneManager = new StoneManager(this._game);
    }

    start() {
        this.#setupPlayer();
    }

    stop() {
        this.getMissileManager().removeAllMissiles();
        this.getStoneManager().removeAllStones();
    }

    tick() {
        if(this.isGameOver()){
            this._game.getGameStateManager().switchGameState(this._game.getGameStateManager().gameStates.gameOver);
            return;
        }
        this._tickKeyboard();
        this.#player.tick();
        this.#missileManager.tick();
        this.#stoneManager.tick();
    }

    draw(canvas) {
        this.#drawBackground(canvas);
        this.#player.draw(canvas);
        this.#missileManager.draw(canvas);
        this.#stoneManager.draw(canvas);

        this.#drawUi(canvas);
    }

    #setupPlayer() {
        this.#player.getLocation().setX((this._game.getCanvas().getWidth() / 2) - (this.#player.getWidth() / 2));
        this.#player.getLocation().setY(this._game.getCanvas().getHeight() - this.#player.getHeight() - 15);  // -15 for floating effect
    }

    #drawBackground(canvas) {
        canvas.getContext().drawImage(this.#backgroundImage, 0, 0, canvas.getWidth(), canvas.getHeight());
    }

    getMissileManager() {
        return this.#missileManager;
    }

    getStoneManager() {
        return this.#stoneManager;
    }

    getPlayer() {
        return this.#player;
    }

    getPoints() {
        return this.#points;
    }

    increesePoints(points = 1) {
        this.#points += points;
    }

    decreasePoints(points = 1) {
        this.#points -= points;
    }

    gameOver() {
        this.#isGameOver = true;
    }

    isGameOver() {
        return this.#isGameOver;
    }

    #drawUi(canvas) {
        canvas.getContext().font = "20px ARIAL"
        canvas.getContext().fillStyle = '#fff';
        canvas.getContext().fillText(`MC: ${(this.getMissileManager().getMissileDelayCounter() / 60).toFixed(1)}`, 0, 16);
        canvas.getContext().fillText(`SCORE: ${this.getPoints()}`, 0, 32);

        if(this._game.isDebugMode()) {
            this.#drawDebug(canvas);
        }
    }

    #drawDebug(canvas) {
        canvas.getContext().fillStyle = '#ff0000';
        const fpsText = `FPS: ${this._game.getCurrentFps()}`;
        canvas.getContext().fillText(fpsText, canvas.getWidth() - canvas.getContext().measureText(fpsText).width, 16);
    }

    _tickKeyboard() {
        this.#player.playerController();
        // change gamestate to inGame
        if(this._game.getGameStateManager().isKeyPressed('Escape')) {
            this._game.getGameStateManager().switchGameState(this._game.getGameStateManager().gameStates.menu);
        }
    }
}

class GameOverState extends GameState {
    start() {

    }

    stop() {

    }

    tick() {
        this._tickKeyboard();
    }

    draw(canvas) {
        canvas.getContext().fillStyle = 'red';
        canvas.getContext().font = '72px Arial';
        const gameOverText = 'Game Over';
        canvas.getContext().fillText(gameOverText, canvas.getWidth() / 2 - canvas.getContext().measureText(gameOverText).width / 2, canvas.getHeight() / 2 + 26);
    }

    _tickKeyboard() {
        // change gamestate to menu
        if(this._game.getGameStateManager().isKeyPressed('Escape')) {
            this._game.getGameStateManager().switchGameState(this._game.getGameStateManager().gameStates.menu);
        }
    }
}

class GameStateManager {
    #game;
    #currentGameState;
    #keysPressed;

    gameStates = {
        inGame: InGameState,
        gameOver: GameOverState,
        menu: MenuState,
    }

    constructor(game) {
        this.#game = game;
        this.#currentGameState = null;
        this.#keysPressed = {};
        
        this._tickKeyboard();
    }

    switchGameState(gameState) {
        if(this.#currentGameState) {
            this.#currentGameState.stop();
        }
        this.#currentGameState = new gameState(this.#game);
        this.#currentGameState.start();
    }

    getCurrentGameState() {
        return this.#currentGameState;
    }

    _tickKeyboard() {
        document.addEventListener("keydown", (event) => {
            // set the state of the pressed key to true
            this.#keysPressed[event.key] = true;

            // D + M Key pressed
            // toggle debug mode
            if(this.#keysPressed['m'] && this.#keysPressed['d']) {
                this.#game.toggleDebugMode();
            }
        });
        document.addEventListener("keyup", (event) => {
            // Set the state of the released key to false
            this.#keysPressed[event.key] = false;
        });
    }

    isKeyPressed(key) {
        return this.#keysPressed[key];
    }
}

// ============================
// Game 

class Game {
    #debugMode;

    #canvas;

    #targetFPS;
    #frameDelay
    #oldTimeStamp;
    #currentFPS;

    #gameStateManager;

    constructor(width, height, maxFps) {
        this.#debugMode = false;

        this.#canvas = new Canvas(width, height);

        this.width = width;
        this.height = height;

        this.#targetFPS = maxFps;
        this.#frameDelay = 1000 / this.#targetFPS;
        this.#oldTimeStamp = 0;
        this.#currentFPS = 0;

        this.#gameStateManager = new GameStateManager(this);
    }

    start() {
        // setup canvas
        this.#canvas.init();

        this.#gameStateManager.switchGameState(this.#gameStateManager.gameStates.menu);

        // start game loop
        window.requestAnimationFrame((timeStamp) => {this.#loop(timeStamp)});
    }

    #loop(timeStamp) {
        // calculate the number of milliseconds passed since the last frame
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
            this.#draw(this.getCanvas());
        }

        // Request the next frame
        window.requestAnimationFrame((timeStamp) => {this.#loop(timeStamp)});
    }

    #tick() {
        this.getGameStateManager().getCurrentGameState().tick(); 
    }

    #draw(canvas) {
        this.getCanvas().clearRect(0, 0, canvas.getWidth(), canvas.getHeight());

        this.getGameStateManager().getCurrentGameState().draw(canvas); 
    }

    isDebugMode() {
        return this.#debugMode;
    }

    setDebugMode(debugMode) {
        this.#debugMode = debugMode;
    }

    toggleDebugMode() {
        this.#debugMode = !this.#debugMode;
    }

    getCanvas() {
        return this.#canvas;
    }

    getGameStateManager() {
        return this.#gameStateManager;
    }

    getCurrentFps() {
        return this.#currentFPS;
    }
}

class Canvas {
    #width;
    #height;

    #canvas;
    #context;

    constructor(width, height) {
        this.#width = width;
        this.#height = height;

        this.#canvas = document.getElementById('canvas');
        this.#context = this.#canvas.getContext("2d");
    }

    init() {
        this.getCanvas().width = this.#width;
        this.getCanvas().height = this.#height;
    }

    getWidth() {
        return this.#width;
    }

    getHeight() {
        return this.#height;
    }

    getCanvas() {
        return this.#canvas;
    }

    getContext() {
        return this.#context;
    }

    drawSquare(x = 0, y = 0, width = 20, height = 20, color = 'white') {
        this.getContext().fillStyle = color;
        this.getContext().fillRect(x, y, width, height);
    }

    clearRect(x, y, width, height) {
        this.getContext().clearRect(x, y, width, height);
    }

    drawStroke(x, y, width, height, color = "yellow", lineWidth = 1) {
        this.getContext().strokeStyle = color;
        this.getContext().lineWidth = lineWidth;
        this.getContext().strokeRect(x , y, width, height);
    }

    drawText() {

    }
}

// ============================
// GAME
// ============================

// initialize game
const game = new Game(1280, 720, 60);
game.start();