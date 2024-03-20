import { InGameState } from './InGameState.js';
import { GameOverState } from './GameOverState.js';
import { MenuState } from './MenuState.js';

export class GameStateManager {
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