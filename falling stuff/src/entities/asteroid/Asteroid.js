import Entity from '../Entity.js';

export default class Asteroid extends Entity {
    constructor(game, x, y, width, height, speed, health) {
        super(game, 'asteroid.png', x, y, width, height, speed, health);
    }

    tick() {
        this.getLocation().setY(this.getLocation().getY() + this.getSpeed());

        if(this.getLocation().getY() > this._game.getCanvas().getHeight()) {
            this._game.getGameStateManager().getCurrentGameState().getAsteroidManager().removeAsteroid(this);
        }
    }

    draw() {
        this._drawSelf();

        if(this._game.isDebugMode()) {
            this.drawDebug();
        }
    }
}