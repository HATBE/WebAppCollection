import Entity from './Entity.js';

export default class Missile extends Entity {
    constructor(game, x, y) {
        super(game, 'missile.png', x, y, 15, 37, 15);
        this.getLocation().setX(x - (this.getWidth() / 2)); // correct x position, minus half of missile width
    }

    tick() {
        this.getLocation().setY(this.getLocation().getY() - this.getSpeed());

        // check if missile leaves screen on the top
        if(this.getLocation().getY() <= 0 - this.getHeight()) {
            this._game.getGameStateManager().getCurrentGameState().getMissileManager().removeMissile(this);
        }
    }

    draw(canvas) {
        this._drawSelf(canvas);
    }
}