import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistDataEntryComponent } from './checklist-data-entry.component';

describe('ChecklistDataEntryComponent', () => {
  let component: ChecklistDataEntryComponent;
  let fixture: ComponentFixture<ChecklistDataEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistDataEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistDataEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
