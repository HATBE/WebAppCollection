import Player from "../../entities/Player.js";
import DrawManager from "../../rendering/DrawManager.js";
import IGameState from "./IGameState.js";

export default class InGameState extends IGameState {
  private player: Player;

  public start(): void {
    this.player = new Player();
    this.player.setSpeed(3);
  }

  public stop(): void {}

  public tick(): void {
    this.tickKeyboardevents();
    /*if (this.player.getLocation().getX() >= 1280 - this.player.getWidth()) {
      this.player.getLocation().setX(0);
    }*/

    if (this.player.getLocation().getY() + this.player.getHeight() < 720) {
      this.player.getLocation().setY(this.player.getLocation().getY() + 7);
    }

    if (this.player.getLocation().getY() + this.player.getHeight() > 720) {
      this.player.getLocation().getY() - this.player.getHeight();
    }
  }

  public draw(): void {
    DrawManager.getInstance().drawSquare(0, 0, 1280, 720, "black");
    DrawManager.getInstance().drawSquare(
      this.player.getLocation().getX(),
      this.player.getLocation().getY(),
      this.player.getWidth(),
      this.player.getHeight()
    );
  }

  protected tickKeyboardevents(): void {}
}
