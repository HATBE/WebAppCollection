export type UpdateFn = (dt: number) => void;
export type RenderFn = () => void;

export default class Loop {
  private rafId: number | null = null;
  private last = 0;
  private update: UpdateFn;
  private render: RenderFn;

  constructor(update: UpdateFn, render: RenderFn) {
    this.update = update;
    this.render = render;
  }

  private tick = (t: number) => {
    const dt = (t - this.last) / 1000;
    this.last = t;

    this.update(dt > 0 && Number.isFinite(dt) ? dt : 0);
    this.render();

    this.rafId = requestAnimationFrame(this.tick);
  };

  public start() {
    if (this.rafId !== null) return;
    this.last = performance.now();
    this.rafId = requestAnimationFrame(this.tick);
  }

  public stop() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
}
