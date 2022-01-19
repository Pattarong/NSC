import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusStudentClassroomComponent } from './status-student-classroom.component';

describe('StatusStudentClassroomComponent', () => {
  let component: StatusStudentClassroomComponent;
  let fixture: ComponentFixture<StatusStudentClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusStudentClassroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusStudentClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
