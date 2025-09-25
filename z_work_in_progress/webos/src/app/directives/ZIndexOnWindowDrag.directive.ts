import { Directive, ElementRef, OnInit } from '@angular/core';
import { WindowStackService } from '../services/WindowStack.service';

@Directive({
  standalone: true,
  selector: '[appZIndexOnWindowDrag]',
  host: {
    '(cdkDragStarted)': 'onDragStart()',
  },
})
export default class ZIndexOnWindowDragDirective implements OnInit {
  constructor(
    private htmlElementRef: ElementRef<HTMLElement>,
    private stack: WindowStackService
  ) {}

  ngOnInit() {
    this.stack.register(this.htmlElementRef.nativeElement);
  }

  public onDragStart() {
    this.stack.bringToFront(this.htmlElementRef.nativeElement);
  }
}