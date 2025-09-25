import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowContent } from './window-content';

describe('WindowContent', () => {
  let component: WindowContent;
  let fixture: ComponentFixture<WindowContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindowContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WindowContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
