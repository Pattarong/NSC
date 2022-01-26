import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnLessonComponent } from './learn-lesson.component';

describe('LearnLessonComponent', () => {
  let component: LearnLessonComponent;
  let fixture: ComponentFixture<LearnLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnLessonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
