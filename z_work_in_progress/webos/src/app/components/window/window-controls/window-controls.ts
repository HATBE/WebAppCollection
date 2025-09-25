import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-window-controls',
  imports: [],
  templateUrl: './window-controls.html',
  styleUrl: './window-controls.css'
})
export class WindowControls {
  @Input() title = "New Window";
}
