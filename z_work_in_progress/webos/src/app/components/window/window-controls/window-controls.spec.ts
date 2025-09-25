import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowControls } from './window-controls';

describe('WindowControls', () => {
  let component: WindowControls;
  let fixture: ComponentFixture<WindowControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindowControls]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WindowControls);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
