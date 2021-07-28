import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DynNumberComponent } from './dyn-number.component';

describe('DynNumberComponent', () => {
  let component: DynNumberComponent;
  let fixture: ComponentFixture<DynNumberComponent>;

  beforeEach(waitForAsync(() => {
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
