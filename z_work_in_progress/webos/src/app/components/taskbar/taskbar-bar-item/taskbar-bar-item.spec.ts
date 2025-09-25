import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskbarBarItem } from './taskbar-bar-item';

describe('TaskbarBarItem', () => {
  let component: TaskbarBarItem;
  let fixture: ComponentFixture<TaskbarBarItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskbarBarItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskbarBarItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
