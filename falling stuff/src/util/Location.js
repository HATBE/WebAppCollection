export default class Location {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    getX() {
        return this.#x;
    }

    setX(x) {
        this.#x = x;
    }

    getY() {
        return this.#y;
    }

    setY(y) { 
        this.#y = y;
    }
}