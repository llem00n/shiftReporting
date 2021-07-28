import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DynSelectComponent } from './dyn-select.component';

describe('DynSelectComponent', () => {
  let component: DynSelectComponent;
  let fixture: ComponentFixture<DynSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DynSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
