export default class GameState {
    _game;
    constructor(game) {
        if (this.constructor === GameState) {throw new Error("Abstract classes can't be instantiated.")};

        this._game = game;
    };

    start() {throw new Error("Method 'start()' must be implemented.");}
    stop() {throw new Error("Method 'stop()' must be implemented.");}

    _loadAssets() {throw new Error("Method '_loadAssets()' must be implemented.");}

    tick() {throw new Error("Method 'tick()' must be implemented.");}
    draw() {throw new Error("Method 'draw()' must be implemented.");}

    _tickKeyboard() {throw new Error("Method '_tickKeyboard()' must be implemented.");}
    mouseClick(event) {throw new Error("Method 'mouseClick()' must be implemented.");}
}
