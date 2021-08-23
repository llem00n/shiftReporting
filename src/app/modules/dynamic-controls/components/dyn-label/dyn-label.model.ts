import { BaseControl } from '../base/base.model';

export class DynLabel extends BaseControl {
  type = 'label';
  valueType = 'string';
  forControl: string;
  private _settings = [
    { controlId: 'bgColor', label: 'Background color', type: 'color' },
    { controlId: 'bold', label: 'Bold', type: 'checkbox' },
    { controlId: 'italic', label: 'Italic', type: 'checkbox' },
    { controlId: 'underline', label: 'Underline', type: 'checkbox' },
    { controlId: 'fSize', label: 'Font Size', type: 'select',
    options: [
      { value: 'xx-small', viewValue: 'xx-small' },
      { value: 'x-small', viewValue: 'x-small' },
      { value: 'small', viewValue: 'small' },
      { value: 'medium', viewValue: 'medium' },
      { value: 'large', viewValue: 'large' },
      { value: 'x-large', viewValue: 'x-large' },
      { value: 'xx-large', viewValue: 'xx-large'}
    ] }, 
    { controlId: 'fFamily', label: 'Font Family', type: 'select',
    options: [
      { value: 'Arial, sans-serif', viewValue: 'Arial' },
      { value: 'Verdana, sans-serif', viewValue: 'Verdana'},
      { value: 'Helvetica , sans-serif', viewValue: 'Helvetica'},
      { value: 'Tahoma, sans-serif', viewValue: 'Tahoma'},
      { value: "'Trebuchet MS' , sans-serif", viewValue: 'Trebuchet MS'},
      { value: "'Times New Roman' , serif", viewValue: 'Times New Roman'},
      { value: "Georgia , serif", viewValue: 'Georgia'},
      { value: "Garamond , serif", viewValue: 'Garamond'},
      { value: "'Courier New' , monospace", viewValue: 'Courier New'},
      { value: "'Brush Script MT' , cursive", viewValue: 'Brush Script MT'},

    ] } 
  ]

  constructor(opt: {} = {}) {
    super(opt);
    this.settings = this.settings.filter(s => s.controlId !== 'isRequired' && s.controlId !== 'name')
    this.settings = this.settings.concat(this._settings);

    this.forControl = opt['forControl'] || null;
    this.controlId = this.controlId || this.createControlId(this.type);
    this.name = opt['name'] || this.type
  }


} 