import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynDatetimeComponent } from './dyn-datetime.component';

describe('DynDatetimeComponent', () => {
  let component: DynDatetimeComponent;
  let fixture: ComponentFixture<DynDatetimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynDatetimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynDatetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
