import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListData } from '../list/list.component';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {
  @Input() data: ListData;
  @Output() clickActionButton: EventEmitter<{ action: string, item: {} }> = new EventEmitter();

  properties: string[];

  ngOnInit() {
    // this.data = {
    //   "tableData": [
    //     {
    //       "templateId": 3,
    //       "name": "123",
    //       "description": "123",
    //       "body": null,
    //       "lastUpdated": "2012-04-23T18:25:43.51",
    //       "templateTypeId": 1,
    //       "templateTypeName": "Shift template"
    //     },
    //     {
    //       "templateId": 4,
    //       "name": "123",
    //       "description": "123",
    //       "body": null,
    //       "lastUpdated": "2012-04-23T18:25:43.51",
    //       "templateTypeId": 1,
    //       "templateTypeName": "Shift template"
    //     },
    //     {
    //       "templateId": 5,
    //       "name": "123",
    //       "description": "123",
    //       "body": null,
    //       "lastUpdated": "2012-04-23T18:25:43.51",
    //       "templateTypeId": 1,
    //       "templateTypeName": "Shift template"
    //     },
    //     {
    //       "templateId": 6,
    //       "name": "123",
    //       "description": "123",
    //       "body": null,
    //       "lastUpdated": "2012-04-23T18:25:43.51",
    //       "templateTypeId": 1,
    //       "templateTypeName": "Shift template"
    //     },
    //     {
    //       "templateId": 1002,
    //       "name": "Yehor_edition",
    //       "description": "Test template",
    //       "body": {
    //         "TemplateData": {},
    //         "PIAFTemplate": {},
    //         "PIAFAttributes": {},
    //         "XML": [],
    //         "Excel": [],
    //         "DatabaseTable": [],
    //         "Datasource": {},
    //         "dashboard": [
    //           {
    //             "type": "select",
    //             "gridItem": {
    //               "cols": 5,
    //               "rows": 1,
    //               "x": 14,
    //               "y": 1
    //             },
    //             "controlId": "select17097a30cfc",
    //             "value": null,
    //             "label": "",
    //             "name": "select",
    //             "bgColor": "#ffffff",
    //             "isRemovable": true,
    //             "_options": [],
    //             "_settings": [
    //               {
    //                 "controlId": "placeholder",
    //                 "label": "Placeholder",
    //                 "type": "text"
    //               },
    //               {
    //                 "controlId": "optionsString",
    //                 "label": "Options",
    //                 "type": "textarea"
    //               }
    //             ],
    //             "placeholder": "select"
    //           },
    //           {
    //             "type": "checkbox",
    //             "gridItem": {
    //               "cols": 1,
    //               "rows": 1,
    //               "x": 0,
    //               "y": 1
    //             },
    //             "controlId": "checkbox17097a3170c",
    //             "value": null,
    //             "label": "",
    //             "name": "",
    //             "bgColor": "#ffffff",
    //             "isRemovable": true,
    //             "valueType": "boolean"
    //           },
    //           {
    //             "type": "text",
    //             "gridItem": {
    //               "cols": 5,
    //               "rows": 1,
    //               "x": 6,
    //               "y": 4
    //             },
    //             "controlId": "text17097d8fa94",
    //             "value": null,
    //             "label": "",
    //             "name": "Name",
    //             "bgColor": "#ffffff",
    //             "isRemovable": true,
    //             "valueType": "string",
    //             "placeholder": ""
    //           },
    //           {
    //             "type": "label",
    //             "gridItem": {
    //               "cols": 5,
    //               "rows": 1,
    //               "x": 0,
    //               "y": 4
    //             },
    //             "controlId": "label17097d90622",
    //             "value": "Name",
    //             "label": "",
    //             "name": "",
    //             "bgColor": "#ffffff",
    //             "isRemovable": true,
    //             "valueType": "string",
    //             "_settings": [
    //               {
    //                 "controlId": "value",
    //                 "label": "Label",
    //                 "type": "text"
    //               }
    //             ]
    //           }
    //         ],
    //         "gridsterOptions": {
    //           "minCols": 12,
    //           "minRows": 13,
    //           "bgColor": "#587e75"
    //         }
    //       },
    //       "lastUpdated": "2020-03-01T22:46:20.23",
    //       "templateTypeId": 1,
    //       "templateTypeName": "Shift template"
    //     },
    //     {
    //       "templateId": 1003,
    //       "name": "123",
    //       "description": "123",
    //       "body": {
    //         "TemplateData": {},
    //         "PIAFTemplate": {},
    //         "PIAFAttributes": {},
    //         "XML": [],
    //         "Excel": [],
    //         "DatabaseTable": [],
    //         "Datasource": {},
    //         "dashboard": [],
    //         "gridsterOptions": {}
    //       },
    //       "lastUpdated": "2012-04-23T18:25:43.51",
    //       "templateTypeId": 1,
    //       "templateTypeName": "Shift template"
    //     },
    //     {
    //       "templateId": 1004,
    //       "name": "123",
    //       "description": "123",
    //       "body": {
    //         "TemplateData": {},
    //         "PIAFTemplate": {},
    //         "PIAFAttributes": {},
    //         "XML": [],
    //         "Excel": [],
    //         "DatabaseTable": [],
    //         "Datasource": {},
    //         "dashboard": [],
    //         "gridsterOptions": {}
    //       },
    //       "lastUpdated": "2012-04-23T18:25:43.51",
    //       "templateTypeId": 1,
    //       "templateTypeName": "Shift template"
    //     }
    //   ],
    //   "head": [
    //     {
    //       "key": "templateId",
    //       "title": "templateId"
    //     },
    //     {
    //       "key": "name",
    //       "title": "name"
    //     },
    //     {
    //       "key": "description",
    //       "title": "description"
    //     },
    //     {
    //       "key": "body",
    //       "title": "body"
    //     },
    //     {
    //       "key": "lastUpdated",
    //       "title": "lastUpdated"
    //     },
    //     {
    //       "key": "templateTypeId",
    //       "title": "templateTypeId"
    //     },
    //     {
    //       "key": "templateTypeName",
    //       "title": "templateTypeName"
    //     }
    //   ],
    //   "actionButtons": [
    //     {
    //       "key": "edit",
    //       "title": "Edit"
    //     },
    //     {
    //       "key": "edit1",
    //       "title": "Edit2"
    //     },
    //     {
    //       "key": "edit2",
    //       "title": "Edit4"
    //     },
        
    //   ]
    // }
  }

  clickActButton(action, item) {
    this.clickActionButton.emit({
      action, item
    })
  }
}



templateId: 3
name: "123"
description: "123"
body: null
lastUpdated: "2012-04-23T18:25:43.51"
templateTypeId: 1
templateTypeName: "Shift template"
