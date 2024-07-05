import DrawManager from './DrawManager.js';

export default class Canvas {
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
}