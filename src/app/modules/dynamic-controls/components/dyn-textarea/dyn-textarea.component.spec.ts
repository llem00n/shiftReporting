import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DynTextareaComponent } from './dyn-textarea.component';

describe('DynTextareaComponent', () => {
  let component: DynTextareaComponent;
  let fixture: ComponentFixture<DynTextareaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DynTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
