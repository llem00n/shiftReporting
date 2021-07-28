import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DynTextComponent } from './dyn-text.component';

describe('DynTextComponent', () => {
  let component: DynTextComponent;
  let fixture: ComponentFixture<DynTextComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DynTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
