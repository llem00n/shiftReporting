import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WeekGridComponent } from './week-grid.component';

describe('WeekGridComponent', () => {
  let component: WeekGridComponent;
  let fixture: ComponentFixture<WeekGridComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
