import { Template } from '@models/';

export class DataEntry {
  dataEntryID:	number;
  scheduleID:	number;
  createDate:	string;
  submitDate:	string;
  template:	Template;
  submitUser:	string;
}