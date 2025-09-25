import { Component, OnInit, signal } from '@angular/core';
import { DesktopFrame } from './components/desktop/desktop-frame/desktop-frame';
import { TaskbarBar } from './components/taskbar/taskbar-bar/taskbar-bar';
import { WindowFrame } from "./components/window/window-frame/window-frame";
import { CommonModule } from '@angular/common';
import { Window } from './components/models/Window.model';
import { WindowService } from './services/Window.service';

@Component({
  selector: 'app-root',
  imports: [DesktopFrame, TaskbarBar, WindowFrame, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('webos');

  public constructor(private windowService: WindowService) {}

  public ngOnInit(): void {
    /*this.windowService.create("My Computer", 400, 300, 50, 50);
    this.windowService.create("Recycle Bin", 300, 300, 100, 100);
    this.windowService.create("Control Panel", 500, 400, 150, 150);*/
  }

  protected getWindows(): Window[] {
    return this.windowService.getWindows();
  }
}