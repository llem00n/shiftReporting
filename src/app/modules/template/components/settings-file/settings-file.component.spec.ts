import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SettingsFileComponent } from './settings-file.component';

describe('SettingsFileComponent', () => {
  let component: SettingsFileComponent;
  let fixture: ComponentFixture<SettingsFileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
