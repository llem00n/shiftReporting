import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ControlOptions } from '../models/control-options.model';

@Injectable()
export class ControlsLocalService {
  private initialData = {
    control: null,
    form: null,
  };
  private dataSourse = new BehaviorSubject<ControlOptions>(this.initialData);
  private data = this.dataSourse.asObservable();
//   constructor(
//     private fb: FormBuilder,
//   ) { }

//   formInit(control: TypeOfControl): FormGroup {
//     const group = this.fb.group({});
//     control && group.addControl(control.key, this.fb.control(control.value));
//     return group;
//   }

  // --------------data-------------
  setData(opt): void {
    // if (!opt.form) {
    //   opt.form = this.formInit(opt.control);
    // }
    this.dataSourse.next(opt);
  }
  getData(): Observable<any> {
    return this.data;
  }
}