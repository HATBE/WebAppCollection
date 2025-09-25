
import { Directive, ElementRef } from '@angular/core';
import { WindowService } from '../services/Window.service';

@Directive({
  standalone: true,
  selector: '[appZIndexOnWindowDrag]',
  host: {
    '(cdkDragStarted)': 'onDragStart()',
  },
})
export default class FocusOnWindowDragDirective {
  constructor(
    private htmlElementRef: ElementRef<HTMLElement>,
    private windowService: WindowService
  ) {}

  public onDragStart() {
    const id = this.htmlElementRef.nativeElement.dataset['id'];
    if(!id) return;
    this.windowService.focus(id);
  }
}