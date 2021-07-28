import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DynLabelComponent } from './dyn-label.component';

describe('DynLabelComponent', () => {
  let component: DynLabelComponent;
  let fixture: ComponentFixture<DynLabelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DynLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
