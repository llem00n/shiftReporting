import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUserDepartmentComponent } from './select-user-department.component';

describe('SelectUserDepartmentComponent', () => {
  let component: SelectUserDepartmentComponent;
  let fixture: ComponentFixture<SelectUserDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectUserDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectUserDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
