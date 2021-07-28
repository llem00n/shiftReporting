import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ButtonLineComponent } from './button-line.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('ButtonLineComponent', () => {
  let component: ButtonLineComponent;
  let fixture: ComponentFixture<ButtonLineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule
      ],
      declarations: [
        ButtonLineComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('initial state', () => {
    const texContentLeft = ['arrow_back Back ', 'arrow_forward Next ', 'first_page Reset '];
    const texContentRight = ['done Ok ', 'cancel Cancel '];
    component.ngOnChanges()
    const deLeft = fixture.debugElement.queryAll(By.css('.left button'));
    expect(deLeft.length).toBe(3);
    expect(deLeft.map(i => i.nativeElement.textContent)).toEqual(texContentLeft);
    const deRight = fixture.debugElement.queryAll(By.css('.right button'));
    expect(deRight.length).toBe(2);
    expect(deRight.map(i => i.nativeElement.textContent)).toEqual(texContentRight);
  });
  it('buttonClick', () => {
    spyOn(component.buttonClick, 'emit');
    const de = fixture.debugElement.queryAll(By.css('button'));
    expect(de.length).toBe(5);
    de.map((item, key) => {
      item.triggerEventHandler('click', null);
      expect(component.buttonClick.emit).toHaveBeenCalledWith(item.query(By.css('span')).nativeElement.textContent.trim());
    });
  });
  it('buttons invisible', () => {
    component.buttonSettings = 'BiNiRiOiCi';
    component.ngOnChanges();
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('button'));
    expect(de).toEqual([]);
  });

  it('buttons disabled', () => {
    component.buttonSettings = 'BdNdRdOdCd';
    component.ngOnChanges();
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('button'));
    expect(de.length).toBe(5);
    const disabledButtons = fixture.debugElement.queryAll(By.css('[disabled]'));
    expect(disabledButtons.length).toBe(5);
  });
  it('buttons visible', () => {
    component.buttonSettings = 'BvNvRvOvCv';
    component.ngOnChanges();
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('button'));
    expect(de.length).toBe(5);
    const disabledButtons = fixture.debugElement.queryAll(By.css('[disabled]'));
    expect(disabledButtons).toEqual([]);
  });

});
