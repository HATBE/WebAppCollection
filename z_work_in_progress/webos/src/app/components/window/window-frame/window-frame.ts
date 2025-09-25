import { Component, Input } from '@angular/core';
import { WindowControls } from '../window-controls/window-controls';
import { WindowContent } from '../window-content/window-content';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import ZIndexOnWindowDragDirective from '../../../directives/ZIndexOnWindowDrag.directive';

@Component({
  selector: 'app-window-frame',
  imports: [WindowControls, WindowContent, CdkDrag, CdkDragHandle, ZIndexOnWindowDragDirective],
  templateUrl: './window-frame.html',
  styleUrl: './window-frame.css'
})
export class WindowFrame {
  @Input() title = "New Window";
}
