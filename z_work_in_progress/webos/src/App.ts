import Drawer from './core/rendering/Drawer';
import Renderer from './core/rendering/Renderer';
import Loop from './core/rendering/RenderLoop';

export default class App {
  private renderer: Renderer;
  private drawer: Drawer;
  private loop: Loop;

  // demo state
  private t = 0;

  public constructor(canvas: HTMLCanvasElement) {
    this.renderer = new Renderer(canvas);
    this.drawer = new Drawer(this.renderer);

    this.loop = new Loop(
      (dt) => this.update(dt),
      () => this.render()
    );

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.stop();
      else this.start();
    });
  }

  private update(dt: number) {
    this.t += dt;
  }

  private render() {
    const w = this.renderer.getWidth();
    const h = this.renderer.getHeight();

    this.renderer.clear();
    this.drawer.drawGrid(40);

    // pulsing circle demo
    const r = 30 + Math.sin(this.t * 2) * 15;
    this.drawer.circle(w / 2, h / 2, r, '#39ff14');

    // HUD
    this.drawer.text(12, 20, `dt≈${this.t.toFixed(2)}s`);
  }

  public start() {
    this.loop.start();
  }

  public stop() {
    this.loop.stop();
  }
}
