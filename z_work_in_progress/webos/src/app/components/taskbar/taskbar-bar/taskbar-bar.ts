import { Component } from '@angular/core';
import { TaskbarBarItem } from '../taskbar-bar-item/taskbar-bar-item';
import { WindowService } from '../../../services/Window.service';
import { CommonModule } from '@angular/common';
import { TaskbarItemStart } from '../taskbar-item-start/taskbar-item-start';

@Component({
  selector: 'app-taskbar-bar',
  imports: [TaskbarBarItem, CommonModule, TaskbarItemStart],
  templateUrl: './taskbar-bar.html',
  styleUrl: './taskbar-bar.css'
})
export class TaskbarBar {
  public constructor(private windowService: WindowService) {}

  protected getWindows() {
    return this.windowService.getWindows();
  }
}
