import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableStuComponent } from './table-stu.component';

describe('TableStuComponent', () => {
  let component: TableStuComponent;
  let fixture: ComponentFixture<TableStuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableStuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableStuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
