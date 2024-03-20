import Entity from './Entity.js';

export default class Player extends Entity {
    constructor(game, x, y, width, height, speed) {
        super(game, 'ufo.png', x, y, width, height, speed);
    }

    tick() {
        
    }

    draw(canvas) {
        this._drawSelf(canvas);
                
        if(this._game.isDebugMode()) {
            this.drawDebug(canvas);
        }
    }

    playerController() {
        // move left
        if(this._game.getGameStateManager().isKeyPressed('a') || this._game.getGameStateManager().isKeyPressed('A') || this._game.getGameStateManager().isKeyPressed('ArrowLeft')) { 
            if(this.getLocation().getX() - this.getSpeed() <= 0) {
                this.getLocation().setX(0);
            } else {
                this.getLocation().setX(this.getLocation().getX() - this.getSpeed());
            }
        }
    
        // move right
        if(this._game.getGameStateManager().isKeyPressed('d') || this._game.getGameStateManager().isKeyPressed('D') || this._game.getGameStateManager().isKeyPressed('ArrowRight')) {
            if(this.getLocation().getX() + this.getSpeed() > this._game.getCanvas().getWidth() +- this.getWidth()) {
                this.getLocation().setX(this._game.getCanvas().getWidth() - this.getWidth());
            } else {
                this.getLocation().setX(this.getLocation().getX() + this.getSpeed())
            }
        }
    
        // shoot missile
        if(this._game.getGameStateManager().isKeyPressed(' ') || this._game.getGameStateManager().isKeyPressed('ArrowUp')) {
            this._game.getGameStateManager().getCurrentGameState().getMissileManager().createMissile(this);
        }
    }

    drawDebug(canvas) {
        super.drawDebug(canvas);
        canvas.getContext().lineWidth = 1;
        canvas.getContext().beginPath(); 
        canvas.getContext().moveTo(this.getLocation().getX() + (this.getWidth() / 2), this.getLocation().getY()); 
        canvas.getContext().lineTo(this.getLocation().getX() + (this.getWidth() / 2), 0); canvas.getContext().stroke();
    }
}