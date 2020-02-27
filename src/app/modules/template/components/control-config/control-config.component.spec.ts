import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlConfigComponent } from './control-config.component';

describe('ControlConfigComponent', () => {
  let component: ControlConfigComponent;
  let fixture: ComponentFixture<ControlConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
