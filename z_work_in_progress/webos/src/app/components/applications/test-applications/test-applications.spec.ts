import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestApplications } from './test-applications';

describe('TestApplications', () => {
  let component: TestApplications;
  let fixture: ComponentFixture<TestApplications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestApplications]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestApplications);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
