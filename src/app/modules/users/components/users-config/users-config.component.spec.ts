import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UsersConfigComponent } from './users-config.component';

describe('UsersConfigComponent', () => {
  let component: UsersConfigComponent;
  let fixture: ComponentFixture<UsersConfigComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
