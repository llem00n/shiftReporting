import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEntryLogComponent } from './data-entry-log.component';

describe('DataEntryLogComponent', () => {
  let component: DataEntryLogComponent;
  let fixture: ComponentFixture<DataEntryLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataEntryLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataEntryLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
