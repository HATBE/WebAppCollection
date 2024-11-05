import GameStateFactory from "./GameStateFactory.js";
import { GameStates } from "./GameStates.js";
import IGameState from "./IGameState.js";

export default class GameStateManager {
  private static instance: GameStateManager | null = null;

  private currentGameState: IGameState | null = null;

  private constructor() {}

  public static getInstance(): GameStateManager {
    if (!this.instance) {
      this.instance = new GameStateManager();
    }
    return this.instance;
  }

  public getCurrentGameState(): IGameState | null {
    return this.currentGameState;
  }

  public setGameState(gameState: GameStates): void {
    if (this.currentGameState) {
      this.currentGameState.stop();
    }

    this.currentGameState = GameStateFactory.getInstance().create(gameState);

    this.currentGameState.start();
  }
}
