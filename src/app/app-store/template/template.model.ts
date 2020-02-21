import { DboardItem } from 'src/app/modules/grid/grid.component';
import { GridsterConfig } from 'angular-gridster2';

export class Template {
  templateId: number;
  name: string;
  description: string;
  body: any; //Jobject
  lastUpdated: string;
  templateTypeId: number;
  templateTypeName: string;
  constructor(options: { [key: string]: any } = {}) {
    this.templateId = options['templateId'] || null;
    this.name = options['name'] || '';
    this.templateTypeId = options['templateTypeId'] || null;
    this.templateTypeName = options['templateTypeName'] || '';
    this.description = options['description'] || '';
    this.lastUpdated = options['lastUpdated'] || '';
    this.body = new TemplateBody(options['body'] || {});
  }
}

class TemplateBody {
  TemplateData: { [key: string]: ValueType };
  PIAFTemplate: PIAFTemplate;
  PIAFAttributes: PIAFAttributes;
  XML: string[];
  Excel: string[];
  DatabaseTable: string[];
  Datasource: { [key: string]: ValueType };
  dashboard: Array<DboardItem>;
  gridsterOptions: GridsterConfig;
  constructor(options: { [key: string]: any } = {}) {
    this.TemplateData = options['TemplateData'] || {};
    this.PIAFTemplate = options['PIAFTemplate'] || {};
    this.PIAFAttributes = options['PIAFAttributes'] || {};
    this.XML = options['XML'] || [];
    this.Excel = options['Excel'] || [];
    this.DatabaseTable = options['DatabaseTable'] || [];
    this.Datasource = options['Datasource'] || {};
    this.dashboard = options['dashboard'] || [];
    this.gridsterOptions = options['gridsterOptions'] || {};

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
