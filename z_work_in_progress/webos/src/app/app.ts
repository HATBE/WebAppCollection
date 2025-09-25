import { Component, signal } from '@angular/core';
import { DesktopFrame } from './components/desktop/desktop-frame/desktop-frame';
import { TaskbarBar } from './components/taskbar/taskbar-bar/taskbar-bar';
import { WindowFrame } from "./components/window/window-frame/window-frame";
import { CommonModule } from '@angular/common';
import ZIndexOnWindowDragDirective from './directives/ZIndexOnWindowDrag.directive';

@Component({
  selector: 'app-root',
  imports: [DesktopFrame, TaskbarBar, WindowFrame, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('webos');

  protected windows = [
    {id: 1, title: 'First Window'},
    {id: 2, title: 'Second Window'},
    {id: 3, title: 'Third Window'}
  ]
}