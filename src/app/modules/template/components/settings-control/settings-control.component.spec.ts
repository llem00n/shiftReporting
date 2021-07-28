import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SettingsControlComponent } from './settings-control.component';

describe('SettingsControlComponent', () => {
  let component: SettingsControlComponent;
  let fixture: ComponentFixture<SettingsControlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
