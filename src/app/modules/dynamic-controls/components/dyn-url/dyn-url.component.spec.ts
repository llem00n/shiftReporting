import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynUrlComponent } from './dyn-url.component';

describe('DynUrlComponent', () => {
  let component: DynUrlComponent;
  let fixture: ComponentFixture<DynUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynUrlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
