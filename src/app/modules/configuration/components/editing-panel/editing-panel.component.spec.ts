import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditingPanelComponent } from './editing-panel.component';

describe('EditingPanelComponent', () => {
  let component: EditingPanelComponent;
  let fixture: ComponentFixture<EditingPanelComponent>;

  beforeEach(waitForAsync(() => {
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
