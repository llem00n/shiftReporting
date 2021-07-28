import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectPlantComponent } from './select-plant.component';

describe('SelectPlantComponent', () => {
  let component: SelectPlantComponent;
  let fixture: ComponentFixture<SelectPlantComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPlantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
