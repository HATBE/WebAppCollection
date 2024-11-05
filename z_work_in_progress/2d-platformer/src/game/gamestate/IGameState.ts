export default abstract class IGameState {
  public abstract start(): void;
  public abstract stop(): void;
  public abstract tick(): void;
  public abstract draw(): void;
  protected tickKeyboardevents(): void {}
  protected tickMouseevents(): void {}
}
