import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InterfacesConfigComponent } from './interfaces-config.component';

describe('InterfacesConfigComponent', () => {
  let component: InterfacesConfigComponent;
  let fixture: ComponentFixture<InterfacesConfigComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InterfacesConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfacesConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
