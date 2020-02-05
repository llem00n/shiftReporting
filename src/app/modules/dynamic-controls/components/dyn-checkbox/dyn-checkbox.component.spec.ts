import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynCheckboxComponent } from './dyn-checkbox.component';

describe('DynCheckboxComponent', () => {
  let component: DynCheckboxComponent;
  let fixture: ComponentFixture<DynCheckboxComponent>;

  beforeEach(async(() => {
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
