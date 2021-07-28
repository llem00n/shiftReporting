import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PiafComponent } from './piaf.component';

describe('PiafComponent', () => {
  let component: PiafComponent;
  let fixture: ComponentFixture<PiafComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PiafComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
