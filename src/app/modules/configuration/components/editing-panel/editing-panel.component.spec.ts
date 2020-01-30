import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingPanelComponent } from './editing-panel.component';

describe('EditingPanelComponent', () => {
  let component: EditingPanelComponent;
  let fixture: ComponentFixture<EditingPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditingPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
