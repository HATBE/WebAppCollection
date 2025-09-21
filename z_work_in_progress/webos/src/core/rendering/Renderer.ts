export default class Renderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private dpr = 1;

  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('2D context not supported');

    this.ctx = ctx;
    this.resize(); // initialise once
    window.addEventListener('resize', () => this.resize());
  }

  private resize() {
    this.dpr = Math.max(1, window.devicePixelRatio || 1);
    const { clientWidth, clientHeight } = this.canvas;

    // avoid 0 sizes
    const w = Math.max(1, Math.floor(clientWidth * this.dpr));
    const h = Math.max(1, Math.floor(clientHeight * this.dpr));

    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
      // scale so drawing APIs use CSS pixel units
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }
  }

  public clear() {
    this.ctx.clearRect(0, 0, this.getWidth(), this.getHeight());
  }

  public get ctx2d(): CanvasRenderingContext2D {
    return this.ctx;
  }

  public getWidth(): number {
    return Math.floor(this.canvas.width / this.dpr);
  }

  public getHeight(): number {
    return Math.floor(this.canvas.height / this.dpr);
  }
}
