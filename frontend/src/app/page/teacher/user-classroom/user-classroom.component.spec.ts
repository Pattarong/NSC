import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserClassroomComponent } from './user-classroom.component';

describe('UserClassroomComponent', () => {
  let component: UserClassroomComponent;
  let fixture: ComponentFixture<UserClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserClassroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
