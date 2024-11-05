import Player from "../../entities/Player.js";
import DrawManager from "../../rendering/DrawManager.js";
import IGameState from "./IGameState.js";

export default class InGameState implements IGameState {
  private player: Player;

  public start(): void {
    this.player = new Player();
  }

  public stop(): void {}

  public tick(): void {
    this.player
      .getLocation()
      .setX(this.player.getLocation().getX() + this.player.getSpeed());
  }

  public draw(): void {
    DrawManager.getInstance().drawSquare(
      this.player.getLocation().getX(),
      this.player.getLocation().getY(),
      this.player.getWidth(),
      this.player.getHeight()
    );
  }
}
