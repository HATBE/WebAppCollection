export default class DrawManager {
    #game;
    #canvas;
    #context;

    constructor(game) {
        this.#game = game;
        this.#canvas = this.#game.getCanvas();
        this.#context = this.#canvas.getContext();
    }

    drawSquare(x = 0, y = 0, width = 20, height = 20, color = 'white') {
        this.#context.fillStyle = color;
        this.#context.fillRect(x, y, width, height);
    }

    clearRect(x, y, width, height) {
        this.#context.clearRect(x, y, width, height);
    }

    drawStroke(x, y, width, height, color = "yellow", lineWidth = 1) {
        this.#context.strokeStyle = color;
        this.#context.lineWidth = lineWidth;
        this.#context.strokeRect(x , y, width, height);
    }

    drawSprite(sprite, x, y, width, height) {
        this.#context.drawImage(sprite, x, y, width, height);
    }

    drawText(text, color, x, y, sizePx = '72', font = 'ARIAL', offsetX = 0, offsetY = 0) {
        this.#context.fillStyle = color;
        this.#context.font = `${sizePx}px ${font}`;

        // TODO: centerXAlign, centerYAlign, leftAlign and rightAlign

        // center X
        if(x == -1) {
            x = this.#canvas.getWidth() / 2 - this.measureText(text).width / 2;
        }

        // center Y
        if(y == -1) {
            y = this.#canvas.getHeight() / 2;
        }

        x += offsetX;
        y += offsetY;

        this.#context.fillText(text, x, y);
    }

    measureText(text) {
        return this.#canvas.getContext().measureText(text);
    }
}