import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearWeekSelectorComponent } from './year-week-selector.component';

describe('YearWeekSelectorComponent', () => {
  let component: YearWeekSelectorComponent;
  let fixture: ComponentFixture<YearWeekSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearWeekSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearWeekSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
