import Location from '../util/Location.js';
import Sprite from '../gfx/Sprite.js';

export default class Entity {
    _game;
    #location;
    #width;
    #height;
    #speed;
    #sprite;
    #maxHealth;
    #health;

    constructor(game, spritePath, x = 0,y = 0, width = 10, height = 10, speed = 2, maxHealth = 10) {
        if (this.constructor === Entity) {throw new Error("Abstract classes can't be instantiated.");}
        
        this._game = game;
        this.#location = new Location(x, y);
        this.#height = height;
        this.#width = width;
        this.#speed = speed;
        this.#sprite = new Sprite(spritePath, this.getWidth(), this.getHeight());
        this.#maxHealth = maxHealth;
        this.#health = this.#maxHealth;
    }

    tick() {throw new Error("Method 'tick()' must be implemented.");}
    draw() {throw new Error("Method 'draw()' must be implemented.");}

    getLocation() {
        return this.#location;
    }

    getWidth() {
        return this.#width;
    }

    getHeight() {
        return this.#height;
    }

    getSpeed() {
        return this.#speed;
    }

    setSpeed(speed) {
        this.#speed = speed;
    }

    getSprite() {
        return this.#sprite;
    }

    getHealth() {
        return this.#health;
    }

    increaseHealth(health = 1) {
        this.#health += health;
    }

    decreaseHealth(health = 1) {
        this.#health -= health;
    }

    setHealth(health) {
        this.#health = health;
    }

    getMaxHealth() {
        return this.#maxHealth;
    }

    drawDebug() {
        this._game.getDrawManager().drawStroke(this.getLocation().getX(), this.getLocation().getY(), this.getWidth(), this.getHeight(), "red");
    }

    _drawSelf() {
        this._game.getDrawManager().drawSprite(this.#sprite, this.getLocation().getX(), this.getLocation().getY(), this.getWidth(), this.getHeight());
    }
}