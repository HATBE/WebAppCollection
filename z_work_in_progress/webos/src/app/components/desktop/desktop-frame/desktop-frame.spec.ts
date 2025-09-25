import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopFrame } from './desktop-frame';

describe('DesktopFrame', () => {
  let component: DesktopFrame;
  let fixture: ComponentFixture<DesktopFrame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopFrame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopFrame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
