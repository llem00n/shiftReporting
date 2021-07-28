import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DaySelectorComponent } from './day-selector.component';

describe('DaySelectorComponent', () => {
  let component: DaySelectorComponent;
  let fixture: ComponentFixture<DaySelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DaySelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
