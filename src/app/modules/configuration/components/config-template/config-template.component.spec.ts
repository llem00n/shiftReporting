import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfigTemplateComponent } from './config-template.component';

describe('ConfigTemplateComponent', () => {
  let component: ConfigTemplateComponent;
  let fixture: ComponentFixture<ConfigTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
