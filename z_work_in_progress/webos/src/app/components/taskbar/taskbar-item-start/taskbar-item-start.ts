import { Component } from '@angular/core';
import { WindowService } from '../../../services/Window.service';

@Component({
  selector: 'app-taskbar-item-start',
  imports: [],
  templateUrl: './taskbar-item-start.html',
  styleUrl: './taskbar-item-start.css'
})
export class TaskbarItemStart {
  public constructor(private windowService: WindowService) {}

  protected start() {
    this.windowService.create("Test Window", 100, 100, 400, 300);
  }
}
