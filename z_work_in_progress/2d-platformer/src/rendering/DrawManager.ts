import Canvas2D from "./Canvas2D.js";

// Special class: you have to first call .configure(), before you can call .getInstance() anyware

export default class DrawManager {
  private static instance: DrawManager | null;

  private canvas: Canvas2D;

  private constructor(canvas: Canvas2D) {
    this.canvas = canvas;
  }

  public static configure(canvas: Canvas2D) {
    if (DrawManager.instance) {
      throw new Error("Drawmanager is already configured");
    }
    DrawManager.instance = new DrawManager(canvas);
  }

  public static getInstance(): DrawManager {
    if (!DrawManager.instance) {
      throw new Error("Drawmanager is not configured");
    }
    return DrawManager.instance;
  }

  public clear() {
    this.canvas.clear();
  }

  public drawSquare(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string = "red"
  ) {
    this.canvas.getContext().fillStyle = color;
    this.canvas.getContext().fillRect(x, y, width, height);
  }

  public drawStroke(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string = "red",
    lineWidth: number = 1
  ) {
    this.canvas.getContext().strokeStyle = color;
    this.canvas.getContext().lineWidth = lineWidth;
    this.canvas.getContext().strokeRect(x, y, width, height);
  }

  public drawSprite(
    sprite: CanvasImageSource,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this.canvas.getContext().drawImage(sprite, x, y, width, height);
  }

  drawText(
    text: string,
    x: number,
    y: number,
    sizePx: string = "72",
    font: string = "ARIAL",
    offsetX: number = 0,
    offsetY: number = 0,
    color: string
  ) {
    this.canvas.getContext().fillStyle = color;
    this.canvas.getContext().font = `${sizePx}px ${font}`;

    // TODO: centerXAlign, centerYAlign, leftAlign and rightAlign

    // center X
    if (x == -1) {
      x = this.canvas.getWidth() / 2 - this.measureText(text).width / 2;
    }

    // center Y
    if (y == -1) {
      y = this.canvas.getHeight() / 2;
    }

    x += offsetX;
    y += offsetY;

    this.canvas.getContext().fillText(text, x, y);
  }

  drawLine(
    xFrom: number,
    yFrom: number,
    xTo: number,
    yTo: number,
    lineWidth: number = 1
  ) {
    this.canvas.getContext().lineWidth = lineWidth;
    this.canvas.getContext().beginPath();
    this.canvas.getContext().moveTo(xFrom, yFrom);
    this.canvas.getContext().lineTo(xTo, yTo);
    this.canvas.getContext().stroke();
  }

  public measureText(text: string) {
    return this.canvas.getContext().measureText(text);
  }
}
