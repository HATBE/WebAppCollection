import App from './App';

const canvas: HTMLCanvasElement = document.getElementById('app') as HTMLCanvasElement;

if (canvas) {
  const app: App = new App(canvas);
  app.start();
} else {
  alert('NO CANVAS');
}
