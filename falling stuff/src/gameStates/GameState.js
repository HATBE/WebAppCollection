export class GameState {
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
