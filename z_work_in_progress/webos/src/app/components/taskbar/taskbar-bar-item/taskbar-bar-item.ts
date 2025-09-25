import { Component, Input } from '@angular/core';
import { WindowService } from '../../../services/Window.service';
import { Window } from '../../models/Window.model';

@Component({
  selector: 'app-taskbar-bar-item',
  imports: [],
  templateUrl: './taskbar-bar-item.html',
  styleUrl: './taskbar-bar-item.css'
})
export class TaskbarBarItem {
  @Input() window!: Window;

  public constructor(private windowService: WindowService) {}

  public focus() {
    this.windowService.focus(this.window.id);
  }
}
