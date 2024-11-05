import IGameState from "./IGameState.js";

export default class InGameState implements IGameState {
  public start(): void {
    console.log("start");
  }
  public stop(): void {
    console.log("stop");
  }
  public tick(): void {
    console.log("tick");
  }
  public draw(): void {
    console.log("draw");
  }
}
