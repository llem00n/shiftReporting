import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiafListComponent } from './piaf-list.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('PiafListComponent', () => {
  let component: PiafListComponent;
  let fixture: ComponentFixture<PiafListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PiafListComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiafListComponent);
    component = fixture.componentInstance;
    component.list = ['test1', 'test2', 'test3'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show list', () => {
    let de: DebugElement[];
    de = fixture.debugElement.queryAll(By.css('button'));
    expect(de.length).toBe(3);
    de.map((i, key) => expect(i.nativeNode.textContent).toMatch(component.list[key]));
  });
  it('should be active item', () => {
    let activeItem = fixture.debugElement.query(By.css('.active'));
    expect(activeItem).toBeNull();
    component.active = 'test2';
    fixture.detectChanges();
    activeItem = fixture.debugElement.query(By.css('.active'));
    expect(activeItem.nativeElement.textContent).toMatch('test2');
  });
  it('#select.emit(item) after click', () => {
    spyOn(component.select, 'emit');
    let de: DebugElement[];
    de = fixture.debugElement.queryAll(By.css('button'));
    de.map((i, key) => {
      i.triggerEventHandler('click', null);
      expect(component.select.emit).toHaveBeenCalledWith(component.list[key]);
    })
  });
});
