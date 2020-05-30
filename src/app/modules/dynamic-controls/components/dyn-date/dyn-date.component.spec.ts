import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynDateComponent } from './dyn-date.component';

describe('DynDateComponent', () => {
  let component: DynDateComponent;
  let fixture: ComponentFixture<DynDateComponent>;

  beforeEach(async(() => {
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
