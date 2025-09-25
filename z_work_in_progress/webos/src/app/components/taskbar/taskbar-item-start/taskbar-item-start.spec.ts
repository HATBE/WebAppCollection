import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskbarItemStart } from './taskbar-item-start';

describe('TaskbarItemStart', () => {
  let component: TaskbarItemStart;
  let fixture: ComponentFixture<TaskbarItemStart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskbarItemStart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskbarItemStart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
