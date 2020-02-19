import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynColorComponent } from './dyn-color.component';

describe('DynColorComponent', () => {
  let component: DynColorComponent;
  let fixture: ComponentFixture<DynColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
