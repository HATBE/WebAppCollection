import Canvas from "./gfx/Canvas.js";
import GameStateManager from "./gameStates/GameStateManager.js";
import DrawManager from "./gfx/DrawManager.js";

export default class Game {
  #debugMode;

  #canvas;

  #targetFPS;
  #frameDelay;
  #oldTimeStamp;
  #currentFPS;

  #gameStateManager;
  #drawManager;

  constructor(width, height, maxFps) {
    this.#debugMode = false;

    this.#canvas = new Canvas(width, height);

    this.width = width;
    this.height = height;

    this.#targetFPS = maxFps;
    this.#frameDelay = 1000 / this.#targetFPS;
    this.#oldTimeStamp = 0;
    this.#currentFPS = 0;

    this.#gameStateManager = new GameStateManager(this);
    this.#drawManager = new DrawManager(this);
  }

  start() {
    // setup canvas
    this.#canvas.init();

    this.#gameStateManager.switchGameState(
      this.#gameStateManager.gameStates.menu
    );

    // start game loop
    window.requestAnimationFrame((timeStamp) => {
      this.#loop(timeStamp);
    });
  }

  #loop(timeStamp) {
    // calculate the number of milliseconds passed since the last frame
    const elapsed = timeStamp - this.#oldTimeStamp;

    // Check if enough time has passed to meet the target FPS
    if (elapsed >= this.#frameDelay) {
      // Update oldTimeStamp
      this.#oldTimeStamp = timeStamp;

      // Calculate fps
      this.#currentFPS = Math.round(1000 / elapsed);

      // tick game
      this.#tick();

      // draw game
      this.#draw(this.getCanvas());
    }

    // Request the next frame
    window.requestAnimationFrame((timeStamp) => {
      this.#loop(timeStamp);
    });
  }

  #tick() {
    this.getGameStateManager().getCurrentGameState().tick();
  }

  #draw() {
    this.getDrawManager().clearRect(
      0,
      0,
      this.getCanvas().getWidth(),
      this.getCanvas().getHeight()
    );

    this.getGameStateManager().getCurrentGameState().draw();
  }

  isDebugMode() {
    return this.#debugMode;
  }

  setDebugMode(debugMode) {
    this.#debugMode = debugMode;
  }

  toggleDebugMode() {
    this.#debugMode = !this.#debugMode;
  }

  getCanvas() {
    return this.#canvas;
  }

  getGameStateManager() {
    return this.#gameStateManager;
  }

  getCurrentFps() {
    return this.#currentFPS;
  }

  getDrawManager() {
    return this.#drawManager;
  }
}
