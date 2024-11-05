import { GameStates } from "./GameStates.js";
import IGameState from "./IGameState.js";
import InGameState from "./InGameState.js";
import MenuState from "./MenuState.js";

export default class GameStateFactory {
  private static instance: GameStateFactory | null = null;

  private constructor() {}

  public static getInstance(): GameStateFactory {
    if (!this.instance) {
      this.instance = new GameStateFactory();
    }
    return this.instance;
  }

  public create(type: GameStates): IGameState {
    switch (type) {
      case GameStates.MENU:
        return new MenuState();
      case GameStates.IN_GAME:
        return new InGameState();
      default:
        throw new Error(`Gamestate ${type} does not exist!`);
    }
  }
}
