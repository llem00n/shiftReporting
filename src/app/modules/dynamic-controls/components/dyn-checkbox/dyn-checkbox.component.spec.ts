import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DynCheckboxComponent } from './dyn-checkbox.component';

describe('DynCheckboxComponent', () => {
  let component: DynCheckboxComponent;
  let fixture: ComponentFixture<DynCheckboxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DynCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
