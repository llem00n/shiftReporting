import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DynDateComponent } from './dyn-date.component';

describe('DynDateComponent', () => {
  let component: DynDateComponent;
  let fixture: ComponentFixture<DynDateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DynDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
