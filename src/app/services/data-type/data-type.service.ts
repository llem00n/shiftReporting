import { Injectable } from '@angular/core';

// export declare type DataType =
//   'System.Boolean'
//   | 'System.Byte'
//   | 'System.DateTime'
//   |'System.String'

@Injectable({
  providedIn: 'root'
})
export class DataTypeService {

  getType(type) {
    return { ...this.data[type] };
  }

  readonly data = {
    'System.Boolean': {
      allowableControls: ['checkbox', 'label'],
      // transformToServer: this.stringToBoolean,
      // transformServerData: this.stringToBoolean
    },
    'System.Byte': {
      allowableControls: ['number', 'label'],
      // inputType: 'text',
      // regexp: regExpInt,
      min: 0,
      max: 255,
      // transformToServer: this.stringToNumber,
      // transformServerData: this.stringToNumber
    },
    'System.DateTime': {
      allowableControls: ['datetime', 'label'],
      // minValue: false,
      // maxValue: true,
      // transformToServer: this.dateToServer,
      // transformServerData: this.dateToApp
    },
    'System.Single': {
      allowableControls: ['number', 'label'],
      // inputType: 'text',
      // regexp: regExpReal,
      minValue: -3.402823e38, // -1.79769313486232e308
      maxValue: 3.402823e38,  // 1.79769313486232e308
      // transformToServer: this.stringToNumber,
      // transformServerData: this.stringToNumber
    },
    'System.Double': {
      // type: 'System.Double',
      // typeName: 'double',
      allowableControls: ['number', 'label'],
      // inputType: 'text',
      // regexp: regExpReal,
      minValue: -1.79769313486231e308, // -1.79769313486232e308
      maxValue: 1.79769313486231e308,  // 1.79769313486232e308
      // transformToServer: this.stringToNumber,
      // transformServerData: this.stringToNumber
    },
    'System.Int16': {
      // type: 'System.Int16',
      // typeName: 'int16',
      allowableControls: ['number', 'label'],
      // inputType: 'text',
      // regexp: regExpInt,
      minValue: -32768,
      maxValue: 32767,
      // transformToServer: this.stringToNumber,
      // transformServerData: this.stringToNumber
    },
    'System.Int32': {
      // type: 'System.Int32',
      // typeName: 'int32',
      allowableControls: ['number', 'label'],
      // inputType: 'text',
      // regexp: regExpInt,
      minValue: -2147483648,
      maxValue: 2147483647,
      // transformToServer: this.stringToNumber,
      // transformServerData: this.stringToNumber
    },
    'System.Int64': {
      // type: 'System.Int64',
      // typeName: 'int64',
      allowableControls: ['number', 'label'],
      // inputType: 'text',
      // regexp: regExpInt,
      minValue: Number.MIN_SAFE_INTEGER,
      maxValue: Number.MAX_SAFE_INTEGER,
      // transformToServer: this.stringToNumber,
      // transformServerData: this.stringToNumber
    },
    'System.String': {
      // type: 'System.String',
      // typeName: 'string',
      allowableControls: ['text', 'label', 'select', 'textarea'],
      // inputType: 'text',
      // transformToServer: this.stringToString,
      // transformServerData: this.stringToString
    },
  };


}
