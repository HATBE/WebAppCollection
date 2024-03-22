import GameState from './GameState.js';

export default class GameOverState extends GameState {
    start() {

    }

    stop() {

    }

    _loadAssets() {
        
    }

    tick() {
        this._tickKeyboard();
    }

    draw(canvas) {
        this._game.getDrawManager().drawText('Game Over', '#ff0000', -1, -1, 72, 'ARIAL');
    }

    _tickKeyboard() {
        // change gamestate to menu
        if(this._game.getGameStateManager().isKeyPressed('Escape')) {
            this._game.getGameStateManager().switchGameState(this._game.getGameStateManager().gameStates.menu);
        }
    }

    mouseClick(event) {

    }
}