import { Component } from '@angular/core';
import { WindowService } from '../../../services/Window.service';

@Component({
  selector: 'app-taskbar-bar-item',
  imports: [],
  templateUrl: './taskbar-bar-item.html',
  styleUrl: './taskbar-bar-item.css'
})
export class TaskbarBarItem {
  public constructor(private windowService: WindowService) {}

  protected test() {
    this.windowService.create("Test Window", 100, 100, 400, 300);
  }
}
