import { Component, Input } from '@angular/core';
import { WindowService } from '../../../services/Window.service';
import { Window } from '../../models/Window.model';
import { TestApplications } from '../../applications/test-applications/test-applications';

@Component({
  selector: 'app-window-content',
  imports: [TestApplications],
  templateUrl: './window-content.html',
  styleUrl: './window-content.css'
})
export class WindowContent {
  @Input() window!: Window;

  public constructor(private windowService: WindowService) {}
  
  updatePosition() {
    this.windowService.updatePosition(this.window.id, 0, 0);
  }

  updateTitle() {
    this.windowService.updateTitle(this.window.id, "Updated Title");
  }
}
