import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsFileComponent } from './settings-file.component';

describe('SettingsFileComponent', () => {
  let component: SettingsFileComponent;
  let fixture: ComponentFixture<SettingsFileComponent>;

  beforeEach(async(() => {
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
