import type Renderer from './Renderer';

export default class Drawer {
  private renderer: Renderer;

  public constructor(renderer: Renderer) {
    this.renderer = renderer;
  }

  public drawGrid(spacing = 32) {
    const ctx = this.renderer.ctx2d;
    const w = this.renderer.getWidth();
    const h = this.renderer.getHeight();

    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';

    for (let x = 0; x <= w; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(w, y + 0.5);
      ctx.stroke();
    }
    ctx.restore();
  }

  public circle(cx: number, cy: number, r: number, fill = '#39ff14') {
    const ctx = this.renderer.ctx2d;
    ctx.save();
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  public rect(x: number, y: number, w: number, h: number, fill = '#fff') {
    const ctx = this.renderer.ctx2d;
    ctx.save();
    ctx.fillStyle = fill;
    ctx.fillRect(x, y, w, h);
    ctx.restore();
  }

  public text(x: number, y: number, str: string, color = '#fff') {
    const ctx = this.renderer.ctx2d;
    ctx.save();
    ctx.fillStyle = color;
    ctx.font = '14px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.fillText(str, x, y);
    ctx.restore();
  }
}
