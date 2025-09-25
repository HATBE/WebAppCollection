import { Injectable } from "@angular/core";
import { Window } from "../components/models/Window.model";
import Emitters from "../emitters/Emitters";

@Injectable({ providedIn: 'root' })
export class WindowService {
  private windows: Window[] = [];

  public getWindows(): Window[] {
    return this.windows;
  }

  public create(title: string = "New Window", width: number = 200, height: number = 200, x: number = 0, y: number = 0): Window {
    const window = {
      id:  crypto.randomUUID(),
      title,
      width,
      height,
      x,
      y,
      element: null,
      isActive: false
    } 

    this.windows.push(window);

    return window;
  }

  public focus(windowId: string) {
    if (this.windows.length === 0) return;
    const topWindow = this.windows[this.windows.length - 1];
    if (topWindow.id === windowId) return;

    const idx = this.windows.findIndex(w => w.id === windowId);

    if (idx > -1) {
      const window = this.windows[idx];
      this.windows = this.windows.filter(w => w.id !== windowId);
      this.windows.push(window);
      this.windows.forEach(w => w.isActive = false);
      window.isActive = true;
      this.updateZIndices();
    }
  }

  public updatePosition(windowId: string, x: number, y: number) {
    const window = this.windows.find(w => w.id === windowId);
    if (!window) return;

    window.x = x;
    window.y = y;

    Emitters.windowPositionUpdateEmitter.emit({id: windowId, x, y});
  }

  public updateTitle(windowId: string, title: string) {
    const window = this.windows.find(w => w.id === windowId);
    if (!window) return;
    
    window.title = title;
    
    Emitters.windowUpdateEmitter.emit(window);
  }

  public close(windowId: string) {
    this.windows = this.windows.filter(w => w.id !== windowId);
    this.updateZIndices();
  }

  private updateZIndices() {
    this.windows.forEach((w, i) => {
      if (w.element) {
        w.element.style.zIndex = String(100 + i);
      }
    });
  }
}