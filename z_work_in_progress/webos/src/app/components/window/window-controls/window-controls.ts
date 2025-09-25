import { Component, Input } from '@angular/core';
import { WindowService } from '../../../services/Window.service';
import { Window } from '../../models/Window.model';

@Component({
  selector: 'app-window-controls',
  imports: [],
  templateUrl: './window-controls.html',
  styleUrl: './window-controls.css'
})
export class WindowControls {
  @Input() window!: Window;

  public constructor(private windowService: WindowService) {}

  protected close() {
    this.windowService.close(this.window.id);
  }
}
