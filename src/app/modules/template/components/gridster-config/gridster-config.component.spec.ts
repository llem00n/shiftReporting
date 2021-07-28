import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GridsterConfigComponent } from './gridster-config.component';

describe('GridsterConfigComponent', () => {
  let component: GridsterConfigComponent;
  let fixture: ComponentFixture<GridsterConfigComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GridsterConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridsterConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
