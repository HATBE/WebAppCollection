export default class Canvas2D {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(height: number, width: number) {
    this.canvas = document.getElementById("game-canvas") as HTMLCanvasElement;

    if (!this.canvas) {
      throw new Error("Canvas is not defined");
    }

    this.canvas.height = height;
    this.canvas.width = width;

    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  public clear(): void {
    this.context.clearRect(0, 0, this.canvas.height, this.canvas.width);
  }

  public getContext(): CanvasRenderingContext2D {
    return this.context;
  }

  public getWidth(): number {
    return this.canvas.width;
  }

  public getHeight(): number {
    return this.canvas.height;
  }
}
