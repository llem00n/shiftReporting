import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynNumberComponent } from './dyn-number.component';

describe('DynNumberComponent', () => {
  let component: DynNumberComponent;
  let fixture: ComponentFixture<DynNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
