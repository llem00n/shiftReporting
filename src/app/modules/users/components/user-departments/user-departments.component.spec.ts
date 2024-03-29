import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDepartmentsComponent } from './user-departments.component';

describe('UserDepartmentsComponent', () => {
  let component: UserDepartmentsComponent;
  let fixture: ComponentFixture<UserDepartmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDepartmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
