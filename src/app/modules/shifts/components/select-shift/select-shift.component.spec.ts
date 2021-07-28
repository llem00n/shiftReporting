import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectShiftComponent } from './select-shift.component';

describe('SelectShiftComponent', () => {
  let component: SelectShiftComponent;
  let fixture: ComponentFixture<SelectShiftComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectShiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
