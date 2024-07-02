import GameState from './GameState.js';

export default class MenuState extends GameState {
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
        // title
        this._game.getDrawManager().drawText('Falling Stuff', '#2c79ff', -1, -1, 72, 'ARIAL', 0, 26);

        // subtitle
        this._game.getDrawManager().drawText('Press "S" to start the game.', '#2c79ff', -1, -1, 25, 'ARIAL', 0, 60);
        this._game.getDrawManager().drawText('Press "ESC" to go back to the main menu again.', '#2c79ff', -1, canvas.getHeight() - 10, 20, 'ARIAL', 0, 0);

        // copyright
        //this._game.getDrawManager().drawText('©2024 by HATBE', -1, canvas.getHeight() - 10, 11, 'ARIAL', 0, 0);

    }

    #createButton() {

    }

    _tickKeyboard() {
        // change gamestate to inGame
        if(this._game.getGameStateManager().isKeyPressed('s') || this._game.getGameStateManager().isKeyPressed('S')) {
            this._game.getGameStateManager().switchGameState(this._game.getGameStateManager().gameStates.inGame);
        }
    }

    mouseClick(event) {
        //alert('klick');
        //console.log(event.pageX); // TODO: somehow zero out coords from top of canvas
    }
}
