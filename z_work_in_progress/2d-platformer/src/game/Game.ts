import Player from "../entities/Player.js";
import Canvas2D from "../rendering/Canvas2D.js";

export default class Game {
  private debugMode: boolean = false;
  private canvas: Canvas2D;

  private targetFPS: number = 60;
  private frameDelay: number = 0;
  private oldTimeStamp: number = 0;
  private currentFPS: number = 0;

  constructor() {
    this.canvas = new Canvas2D(1280, 720);

    this.initGameLoop();

    window.requestAnimationFrame((timeStamp) => {
      this.gameLoop(timeStamp);
    });
  }

  private initGameLoop() {
    this.frameDelay = 1000 / this.targetFPS;
    this.oldTimeStamp = 0;
    this.currentFPS = 0;
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

  private tick() {}

  private draw() {
    this.canvas.clear();
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
