export default class DrawManager {
    #game;
    #canvas;

    constructor(game) {
        this.#game = game;
        this.#canvas = this.#game.getCanvas();
    }

    drawSquare(x = 0, y = 0, width = 20, height = 20, color = 'white') {
        this.#canvas.getContext().fillStyle = color;
        this.#canvas.getContext().fillRect(x, y, width, height);
    }

    clearRect(x, y, width, height) {
        this.#canvas.getContext().clearRect(x, y, width, height);
    }

    drawStroke(x, y, width, height, color = "yellow", lineWidth = 1) {
        this.#canvas.getContext().strokeStyle = color;
        this.#canvas.getContext().lineWidth = lineWidth;
        this.#canvas.getContext().strokeRect(x , y, width, height);
    }

    drawSprite(sprite, x, y, width, height) {
        this.#canvas.getContext().drawImage(sprite, x, y, width, height);
    }

    drawText() {
        // TODO:
    }

}