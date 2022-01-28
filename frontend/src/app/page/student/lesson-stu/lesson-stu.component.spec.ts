import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonStuComponent } from './lesson-stu.component';

describe('LessonStuComponent', () => {
  let component: LessonStuComponent;
  let fixture: ComponentFixture<LessonStuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonStuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonStuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
