import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskbarBar } from './taskbar-bar';

describe('TaskbarBar', () => {
  let component: TaskbarBar;
  let fixture: ComponentFixture<TaskbarBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskbarBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskbarBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
