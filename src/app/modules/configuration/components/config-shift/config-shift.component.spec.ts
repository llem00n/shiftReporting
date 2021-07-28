import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfigShiftComponent } from './config-shift.component';

describe('ConfigShiftComponent', () => {
  let component: ConfigShiftComponent;
  let fixture: ComponentFixture<ConfigShiftComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigShiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
