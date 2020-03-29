import { Template } from '@models/';

export class DataEntry {
  dataEntryId?: number = null;
  scheduleId: number = null;
  createDate: string = null; 
  submitDate: string = null;
  template: Template = null;
  submitUser: string = null;
  modifiedUserId: number = null;
  
  constructor(opt: {} = {}) {
    Object.keys(opt).map(key => {
      if (Object.keys(this).includes(key)) {
        this[key] = opt[key]
      }
    })
  }

}