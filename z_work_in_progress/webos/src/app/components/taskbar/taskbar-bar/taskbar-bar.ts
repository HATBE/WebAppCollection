import { Component } from '@angular/core';
import { TaskbarBarItem } from '../taskbar-bar-item/taskbar-bar-item';

@Component({
  selector: 'app-taskbar-bar',
  imports: [TaskbarBarItem],
  templateUrl: './taskbar-bar.html',
  styleUrl: './taskbar-bar.css'
})
export class TaskbarBar {

}
