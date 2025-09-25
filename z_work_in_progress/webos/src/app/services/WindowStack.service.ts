import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class WindowStackService {
  private windows: HTMLElement[] = [];

  register(window: HTMLElement) {
    if (!this.windows.includes(window)) {
      this.windows.push(window);
      this.updateZIndices();
    }
  }

  bringToFront(window: HTMLElement) {
    this.windows = this.windows.filter(w => w !== window);
    this.windows.push(window);
    this.updateZIndices();
  }

  private updateZIndices() {
    this.windows.forEach((w, i) => {
      w.style.zIndex = String(100 + i); // 100, 101, 102, ...
    });
  }
}