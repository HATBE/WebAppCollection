import { GameState } from './GameState.js';
import { Sprite } from '../Sprite.js';
import { Player } from '../entities/Player.js';
import { MissileManager } from '../entities/MissileManager.js';
import { AsteroidManager } from '../entities/AsteroidManager.js';

export class InGameState extends GameState {
    #player;
    #backgroundImage;

    #isGameOver = false;

    #missileManager;
    #asteroidManager;

    #points = 0;

    constructor(game) {
        super(game);

        this.#backgroundImage = new Sprite("space.jpg", this._game.getCanvas().getWidth(), this._game.getCanvas().getHeight());
        this.#player = new Player(this._game, 0, 0, 70, 50, 5);

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

    draw(canvas) {
        this.#drawBackground(canvas);
        this.#player.draw(canvas);
        this.#missileManager.draw(canvas);
        this.#asteroidManager.draw(canvas);

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