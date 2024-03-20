import { Asteroid } from '../entities/Asteroid.js';
import { Util } from '../util/Util.js';

export class AsteroidManager {
    _game;

    #asteroidSpawnDelay = 30; // in frames (60 = approx every sec.)
    
    #asteroids = [];
    #asteroidDelayCounter = 0;

    constructor(game) {
        this._game = game;
    }

    tick() {
        if(!this.#asteroids) {
            return;
        }

        this.#asteroids.forEach((asteroid, asteroidIdx) => {
           asteroid.tick();
        
            // check if asteroids collide with player
            if(Util.doEntitiesIntersect(asteroid, this._game.getGameStateManager().getCurrentGameState().getPlayer())) {
                this._game.getGameStateManager().getCurrentGameState().getAsteroidManager().removeAsteroid(this);
                this._game.getGameStateManager().getCurrentGameState().gameOver();
                return;
            }
        });

        // create new Asteroid
        this.#asteroidDelayCounter--;
        if(this.#asteroidDelayCounter <= 0) {
            this.#asteroidDelayCounter = this.#asteroidSpawnDelay;
            this.createAsteroid();
        }
    }

    draw(canvas) {
        if(!this.#asteroids) {
            return;
        }

        this.#asteroids.forEach((asteroid) => {
           asteroid.draw(canvas);
        });
    }

    createAsteroid() {
        const asteroidWidth = 80;
        const asteroidHeight = 80;

        this.#asteroidDelayCounter = this.#asteroidSpawnDelay;

        const randomX = Math.floor(Math.random() * (this._game.getCanvas().getWidth() - asteroidWidth)) + 1; // generates a random integer from 1 to canvas width minus width of asteroid
        const randomSpeed = Math.round(((Math.random() * 2) + 1) * 10) / 10; // random decimal between 1.0 and 3.0, rounded to 1 decimal place.

        this.#asteroids.push(new Asteroid(this._game, randomX, 0, asteroidWidth, asteroidHeight, randomSpeed));
    }

    removeAsteroid(asteroid) {
        this.#asteroids.splice(this.#asteroids.indexOf(asteroid), 1);
    }

    removeAllAsteroids() {
        this.#asteroids = [];
    }

    getAsteroids() {
        return this.#asteroids;
    }
}