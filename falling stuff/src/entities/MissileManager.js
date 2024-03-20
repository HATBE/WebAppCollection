import Missile from '../entities/Missile.js';
import Util from '../util/Util.js';

export default class MissileManager {
    _game;

    #missileSpawnDelay = 20; // in frames (60 = approx every sec.)
    
    #missiles = [];
    #missileDelayCounter = 0;

    constructor(game) {
        this._game = game;
    }

    tick() {
        if(!this.#missiles) {
            return;
        }

        this.#missiles.forEach((missile, missileIdx) => {
            missile.tick();

            this._game.getGameStateManager().getCurrentGameState().getAsteroidManager().getAsteroids().forEach((asteroid, asteroidIdx) => {
                if(Util.doEntitiesIntersect(missile, asteroid)) {
                    this._game.getGameStateManager().getCurrentGameState().getAsteroidManager().removeAsteroid(asteroid);
                    this.removeMissile(missile);
                    this._game.getGameStateManager().getCurrentGameState().increesePoints();
                }
            });
        });

        if(this.#missileDelayCounter > 0) {
            this.#missileDelayCounter--;
        }
    }

    draw(canvas) {
        if(!this.#missiles) {
            return;
        }

        this.#missiles.forEach((missile) => {
           missile.draw(canvas);
        });
    }

    createMissile(player) {
        if(this.#missileDelayCounter <= 0) {
            this.#missileDelayCounter = this.#missileSpawnDelay;
            this.#missiles.push(new Missile(this._game, player.getLocation().getX() + (player.getWidth() / 2), player.getLocation().getY()));
        }
    }

    removeMissile(missile) {
        this.#missiles.splice(this.#missiles.indexOf(missile), 1);
    }

    removeAllMissiles() {
        this.#missiles = [];
    }

    getMissileDelayCounter() {
        return this.#missileDelayCounter;
    }
}