import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserModeComponent } from './user-mode.component';

describe('UserModeComponent', () => {
  let component: UserModeComponent;
  let fixture: ComponentFixture<UserModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
