import GameState from './GameState.js';
import Sprite from '../gfx/Sprite.js';
import Player from '../entities/player/Player.js';
import MissileManager from '../entities/missile/MissileManager.js';
import AsteroidManager from '../entities/asteroid/AsteroidManager.js';

export default class InGameState extends GameState {
    #player;
    #backgroundImage;

    #isGameOver = false;

    #missileManager;
    #asteroidManager;

    #points = 0;

    constructor(game) {
        super(game);

        this._loadAssets();

        this.#backgroundImage = new Sprite("space.jpg", this._game.getCanvas().getWidth(), this._game.getCanvas().getHeight());
        this.#player = new Player(this._game, 0, 0, 70, 50, 5, 5);

        this.#missileManager = new MissileManager(this._game);
        this.#asteroidManager = new AsteroidManager(this._game);
    }

    start() {
        this.#setupPlayer();
    }

    stop() {
        this.getMissileManager().removeAllMissiles();
        this.getAsteroidManager().removeAllAsteroids();
    }

    _loadAssets() {
        
    }

    tick() {
        if(this.isGameOver()){
            this._game.getGameStateManager().switchGameState(this._game.getGameStateManager().gameStates.gameOver);
            return;
        }
        this._tickKeyboard();
        this.#player.tick();
        this.#missileManager.tick();
        this.#asteroidManager.tick();
    }

    draw() {
        this.#drawBackground();
        this.#missileManager.draw();
        this.#player.draw();
        this.#asteroidManager.draw();

        this.#drawUi();
    }

    #setupPlayer() {
        this.#player.getLocation().setX((this._game.getCanvas().getWidth() / 2) - (this.#player.getWidth() / 2));
        this.#player.getLocation().setY(this._game.getCanvas().getHeight() - this.#player.getHeight() - 15);  // -15 for floating effect
    }

    #drawBackground() {
        this._game.getDrawManager().drawSprite(this.#backgroundImage, 0, 0, this._game.getCanvas().getWidth(), this._game.getCanvas().getHeight());
    }

    getMissileManager() {
        return this.#missileManager;
    }

    getAsteroidManager() {
        return this.#asteroidManager;
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

    #drawUi() {
        this._game.getDrawManager().drawText(`P HEALTH: ${(this.#player.getHealth())}`, '#fff', 0, 16, 20, 'ARIAL');
        this._game.getDrawManager().drawText(`SCORE: ${this.getPoints()}`, '#fff', 0, 32, 20, 'ARIAL');


        if(this._game.isDebugMode()) {
            this.#drawDebug();
        }
    }

    #drawDebug() {
        const fpsText = `FPS: ${this._game.getCurrentFps()}`;
        this._game.getDrawManager().drawText(fpsText, '#ff0000', this._game.getCanvas().getWidth() - this._game.getDrawManager().measureText(fpsText).width, 16, 20, 'ARIAL');
    }

    _tickKeyboard() {
        this.#player.playerController();
        // change gamestate to inGame
        if(this._game.getGameStateManager().isKeyPressed('Escape')) {
            this._game.getGameStateManager().switchGameState(this._game.getGameStateManager().gameStates.menu);
        }
    }

    mouseClick(event) {

    }
}