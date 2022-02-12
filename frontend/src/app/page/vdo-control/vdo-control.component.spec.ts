import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VdoControlComponent } from './vdo-control.component';

describe('VdoControlComponent', () => {
  let component: VdoControlComponent;
  let fixture: ComponentFixture<VdoControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VdoControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VdoControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
