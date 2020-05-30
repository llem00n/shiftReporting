import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersConfigComponent } from './users-config.component';

describe('UsersConfigComponent', () => {
  let component: UsersConfigComponent;
  let fixture: ComponentFixture<UsersConfigComponent>;

  beforeEach(async(() => {
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
