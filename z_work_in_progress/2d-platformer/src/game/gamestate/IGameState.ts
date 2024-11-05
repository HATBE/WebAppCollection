export default interface IGameState {
  start(): void;
  stop(): void;
  tick(): void;
  draw(): void;
}
