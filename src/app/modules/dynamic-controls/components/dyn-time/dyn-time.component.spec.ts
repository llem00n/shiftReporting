import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynTimeComponent } from './dyn-time.component';

describe('DynTimeComponent', () => {
  let component: DynTimeComponent;
  let fixture: ComponentFixture<DynTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
