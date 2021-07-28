import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfigScheduleComponent } from './config-schedule.component';

describe('ConfigScheduleComponent', () => {
  let component: ConfigScheduleComponent;
  let fixture: ComponentFixture<ConfigScheduleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
