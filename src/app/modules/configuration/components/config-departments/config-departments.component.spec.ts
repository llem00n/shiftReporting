import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigDepartmentsComponent } from './config-departments.component';

describe('ConfigDepartmentsComponent', () => {
  let component: ConfigDepartmentsComponent;
  let fixture: ComponentFixture<ConfigDepartmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigDepartmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
