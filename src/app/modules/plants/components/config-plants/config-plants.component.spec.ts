import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigPlantsComponent } from './config-plants.component';

describe('ConfigPlantsComponent', () => {
  let component: ConfigPlantsComponent;
  let fixture: ComponentFixture<ConfigPlantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigPlantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigPlantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
