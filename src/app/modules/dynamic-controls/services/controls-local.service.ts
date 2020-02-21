import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ControlOptions } from '../models/control-options.model';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable()
export class ControlsLocalService {
  private initialData = {
    control: null,
    form: null,
  };
  private dataSourse = new BehaviorSubject<ControlOptions>(this.initialData);
  private data = this.dataSourse.asObservable();
  // --------------data-------------
  setData(opt): void {
    if (!opt.form) opt.form = this.createFakeForm(opt.control);
    this.dataSourse.next(opt);
  }
  getData(): Observable<any> {
    return this.data;
  }
  createFakeForm(control): FormGroup {
    const group: FormGroup = new FormGroup({});
    group.addControl(control.key, new FormControl(control.value))
    return group;
  }
  //   constructor(
  //     private fb: FormBuilder,
  //   ) { }

  //   formInit(control: TypeOfControl): FormGroup {
  //     const group = this.fb.group({});
  //     control && group.addControl(control.key, this.fb.control(control.value));
  //     return group;
  //   }

}