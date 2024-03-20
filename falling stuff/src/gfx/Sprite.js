export class Sprite {
    #image;

    constructor(path, width, height) {
        this.#image = new Image(width, height);
        this.#image.src = `./assets/${path}`;

        return this.#image;
    }
}