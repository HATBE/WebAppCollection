import Canvas2D from "../rendering/Canvas2D.js";
import DrawManager from "../rendering/DrawManager.js";
import GameStateManager from "./gamestate/GameStateManager.js";
import { GameStates } from "./gamestate/GameStates.js";

export default class Game {
  private debugMode: boolean = false;
  private canvas: Canvas2D;

  private targetFPS: number = 60;
  private frameDelay: number = 0;
  private oldTimeStamp: number = 0;
  private currentFPS: number = 0;

  constructor() {
    this.canvas = new Canvas2D(1280, 720);
    DrawManager.configure(this.canvas);

    this.initGameLoop();

    window.requestAnimationFrame((timeStamp) => {
      this.gameLoop(timeStamp);
    });
  }

  private initGameLoop() {
    // set initial state to MENU
    GameStateManager.getInstance().setGameState(GameStates.MENU);

    this.frameDelay = 1000 / this.targetFPS;
    this.oldTimeStamp = 0;
    this.currentFPS = 0;
    console.log("init");
  }

  private gameLoop(timeStamp: number) {
    const elapsed = timeStamp - this.oldTimeStamp;

    if (elapsed >= this.frameDelay) {
      this.oldTimeStamp = timeStamp;

      this.currentFPS = Math.round(1000 / elapsed);

      this.tick();
      this.draw();
    }

    window.requestAnimationFrame((timeStamp) => {
      this.gameLoop(timeStamp);
    });
  }

  private tick() {
    GameStateManager.getInstance().getCurrentGameState()?.tick();
  }

  private draw() {
    DrawManager.getInstance().clear();
    GameStateManager.getInstance().getCurrentGameState()?.draw();
  }

  public isDebug(): boolean {
    return this.debugMode;
  }

  public setDebug(bool: boolean): void {
    this.debugMode = bool;
  }

  public toggleDebug(): void {
    this.debugMode = !this.debugMode;
  }

  public getCurrentFps() {
    return this.currentFPS;
  }
}
