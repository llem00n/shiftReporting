import { DynControl } from 'src/app/modules/dynamic-controls/models';

export class Template {
  templateId?: number;
  name: string;
  description: string;
  body: TemplateBody; //Jobject
  lastUpdated: string;
  templateTypeId: number;
  templateTypeName: string;
  _departmentId?: number;
  constructor(opt: { [key: string]: any } = {}) {
    if (opt['templateId']) { this.templateId = opt['templateId'] }
    // this.templateId = opt['templateId'] || null;
    this.name = opt['name'] || '';
    this.templateTypeId = opt['templateTypeId'] || null;
    this.templateTypeName = opt['templateTypeName'] || '';
    this.description = opt['description'] || '';
    this.lastUpdated = opt['lastUpdated'] || '';
    this.body = new TemplateBody(opt['body'] || {});
  }
}

class TemplateBody {
  TemplateData: { [key: string]: { name: 'string', value: ValueType } };
  PIAFTemplate: PIAFTemplate;
  PIAFAttributes: PIAFAttributes;
  XML: string[];
  Excel: string[];
  DatabaseTable: string[];
  Datasource: { [key: string]: ValueType };
  dashboard: Array<DynControl>;
  gridsterOptions: {};
  constructor(opt: { [key: string]: any } = {}) {
    this.TemplateData = opt['TemplateData'] || {};
    this.PIAFTemplate = opt['PIAFTemplate'] || {};
    this.PIAFAttributes = opt['PIAFAttributes'] || {};
    this.XML = opt['XML'] || [];
    this.Excel = opt['Excel'] || [];
    this.DatabaseTable = opt['DatabaseTable'] || [];
    this.Datasource = opt['Datasource'] || {};
    this.dashboard = opt['dashboard'] || [];
    this.gridsterOptions = opt['gridsterOptions'] || {};
  }

  get templateDataKV() {
    const result = {};
    Object.keys(this.TemplateData).map(key => {       
      result[key] = this.TemplateData[key].value;
    })
    console.log(result);    
    return result;
  }

  set templateDataKV(data: {}) {
    const result = {};
    Object.keys(data).map(key => {
      result[key] = {
        name: this.dashboard.find(i => i.controlId === key).name,
        value: data[key]
      }
    })    
    Object.assign(this.TemplateData, result);
  }
};
type ValueType = number | string | boolean;

interface PIAFTemplate {
  TemplateName: string;
  StartTime: string;
  EndTime: string;
  EventName: string;
  Attributes: Attributes;
};

interface PIAFAttributes {
  Timestemp: string;
  Attributes: Attributes;
};

interface Attributes {

};
