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

    mouseClick(event) {

    }
}