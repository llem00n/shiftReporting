import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPiafComponent } from './settings-piaf.component';

describe('SettingsPiafComponent', () => {
  let component: SettingsPiafComponent;
  let fixture: ComponentFixture<SettingsPiafComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsPiafComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPiafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
