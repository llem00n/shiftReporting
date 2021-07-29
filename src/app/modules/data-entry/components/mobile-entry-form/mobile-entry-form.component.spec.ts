import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileEntryFormComponent } from './mobile-entry-form.component';

describe('MobileEntryFormComponent', () => {
  let component: MobileEntryFormComponent;
  let fixture: ComponentFixture<MobileEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileEntryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
