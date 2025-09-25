import { Component, Input, OnInit } from '@angular/core';
import { WindowControls } from '../window-controls/window-controls';
import { WindowContent } from '../window-content/window-content';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { Window } from '../../models/Window.model';
import { WindowService } from '../../../services/Window.service';
import FocusOnWindowDragDirective from '../../../directives/FocusOnWindowDrag.directive';
import Emitters from '../../../emitters/Emitters';

@Component({
  selector: 'app-window-frame',
  imports: [WindowControls, WindowContent, CdkDrag, CdkDragHandle, FocusOnWindowDragDirective],
  templateUrl: './window-frame.html',
  styleUrl: './window-frame.css'
})
export class WindowFrame implements OnInit{
  @Input() window!: Window;
  protected position: { x: number; y: number } = { x: 0, y: 0 };

  public constructor(private windowService: WindowService) {}

  public ngOnInit(): void {
    this.position = { x: this.window.x, y: this.window.y };
    Emitters.windowUpdateEmitter.subscribe((window: Window) => {
      if (window.id === this.window.id) {
        this.window = window;
      }
    });
    Emitters.windowPositionUpdateEmitter.subscribe(({id, x, y}) => {
      console.log("id", id, "thisid", this.window.id, "x", x, "y", y);
      if (id === this.window.id) {
        this.position = { x, y };
      }
    });
  }

  protected click() {
    this.windowService.focus(this.window.id);  
  }
}
