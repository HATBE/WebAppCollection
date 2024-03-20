export class Canvas {
    #width;
    #height;

    #canvas;
    #context;

    constructor(width, height) {
        this.#width = width;
        this.#height = height;

        this.#canvas = document.getElementById('canvas');
        this.#context = this.#canvas.getContext("2d");
    }

    init() {
        this.getCanvas().width = this.#width;
        this.getCanvas().height = this.#height;
    }

    getWidth() {
        return this.#width;
    }

    getHeight() {
        return this.#height;
    }

    getCanvas() {
        return this.#canvas;
    }

    getContext() {
        return this.#context;
    }

    drawSquare(x = 0, y = 0, width = 20, height = 20, color = 'white') {
        this.getContext().fillStyle = color;
        this.getContext().fillRect(x, y, width, height);
    }

    clearRect(x, y, width, height) {
        this.getContext().clearRect(x, y, width, height);
    }

    drawStroke(x, y, width, height, color = "yellow", lineWidth = 1) {
        this.getContext().strokeStyle = color;
        this.getContext().lineWidth = lineWidth;
        this.getContext().strokeRect(x , y, width, height);
    }

    drawText() {
        // TODO:
    }
}