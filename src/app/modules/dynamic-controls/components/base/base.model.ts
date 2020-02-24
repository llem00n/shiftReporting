export class BaseControl {
  key: string;
  type = 'base';
  value?: boolean | string | number | null;
  valueType?: string;
  validators?: { [key: string]: boolean | number | string };
  label?: string;
  
  gridItemOptions?: { [key: string]: boolean | string | number } = {
    cols: 5,
    rows: 1,
    maxItemCols: Infinity,
    maxItemRows: 1,
    resizeEnabled: true,
  };


  constructor(options: {} = {}) {
    this.key = options['key'] || '';
    this.value = options.hasOwnProperty('value') ? options['value'] : null;
    this.label = options['label'] || '';
  }
  createKey?(type) {
    return type + Date.now().toString(16);
  }
}


// export abstract class BaseControl {
//   key: string;
//   type: string;
//   value?: boolean | string | number | null;
//   valueType?: string;
//   validators?: string[];
//   label?: string;

//   constructor(
//     options: {
//       key?: string;
//       type?: string;
//       value?: boolean | string | number | null;
//       valueType?: string;
//       validators?: string[];
//       label?: string;
//     } = {}
//   ) {
//     this.key = options.key || '';
//     this.value = options.hasOwnProperty('value') ? options.value : null;
//     this.label = options.label || '';
//     // this.valueType = string;
//     // this.validators = string[];

//   }

//   createKey(type) {
//     return type + Date.now().toString(16);
//   }
// }