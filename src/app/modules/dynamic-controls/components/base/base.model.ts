export interface BaseControl {
  key: string;
  type: string;
  value?: boolean | string | number | null;
  valueType?: string;
  validators?: { [key: string]: boolean | number | string };
  label?: string;
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