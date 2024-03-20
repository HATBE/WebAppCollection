import { Game } from './src/Game.js';

// TODO: wave system
// TODO: add hitbox (smaller then entity itself)
// TODO: asteroids cant spawn on other asteroid (and cannot speedup into other asteroid, or maybe it can and one of them gets destroyed or they split into smnaller ones????)
// TODO: implement health system, for asteroids and for player
// TODO: load images on gamestate initialisation !!
// TODO: ui manager (for the text, with buffer and renders that left and right aligned, usw)
// TODO: explosion on missile impact
// TODO: fire trail on missile
// TODO: implement hitbox and collide box
// TODO: some aliens that attack you, maybe floating or just on the top??
// TODO: implement brake (serialase state of game )
// TODO: highscore (safe in local storage)
// TODO: give score to gameover screen

// initialize game
const game = new Game(1280, 720, 60);
game.start();