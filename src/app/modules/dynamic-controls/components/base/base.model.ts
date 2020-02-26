import { GridsterItem } from 'angular-gridster2';

export class BaseControl {
  controlId: string;
  type = 'base';
  value?: boolean | string | number | null;
  valueType?: string;
  validators?: { [key: string]: boolean | number | string };
  label?: string;

  gridItem?: Partial<GridsterItem> = {
    cols: 5,
    rows: 1,
    maxItemCols: Infinity,
    maxItemRows: 1,
    resizeEnabled: true,
  };


  constructor(opt: {} = {}) {
    this.controlId = opt['controlId'] || null;
    this.value = opt.hasOwnProperty('value') ? opt['value'] : null;
    this.label = opt['label'] || '';
    this.gridItem = this.setGridItem(opt['gridItem'])
  }

  setGridItem(gridItem) {
    if (!gridItem) return null;
    const result = {};
    Object.assign(result, this.gridItem, gridItem)
    result['cols'] = Math.min(result['cols'], this.gridItem.maxItemCols)
    return result
  }
  createControlId?(type) {
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