import GameStateManager from "./GameStateManager.js";
import { GameStates } from "./GameStates.js";
import IGameState from "./IGameState.js";

export default class MenuState implements IGameState {
  public start(): void {
    // TODO: JUST TEMP for dev
    GameStateManager.getInstance().setGameState(GameStates.IN_GAME);
  }

  public stop(): void {
    console.log("stop menu");
  }

  public tick(): void {
    console.log("tick menu");
  }

  public draw(): void {
    console.log("draw menu");
  }
}
