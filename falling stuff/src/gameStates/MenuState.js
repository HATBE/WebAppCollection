import GameState from './GameState.js';

export default class MenuState extends GameState {
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
        canvas.getContext().fillText(escapeGameText, canvas.getWidth() / 2 - canvas.getContext().measureText(escapeGameText).width / 2, canvas.getHeight() - 10);

        // copyright
        const copyrightText = '©2024 by HATBE';
        canvas.getContext().font = "11px ARIAL";
        canvas.getContext().fillText(copyrightText, canvas.getWidth() - canvas.getContext().measureText(copyrightText).width - 10, canvas.getHeight() - 10);
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
