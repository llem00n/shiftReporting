export interface Configuration {
  configurationId: number;
  value: number | boolean | string;
  valueType: 'System.Boolean' | 'System.DateTime' | 'System.Double' | 'System.String';
  propertyName: string;
  propertyDescription: string;
}

export interface UpdateConfigurations {
  configurationID: number;
  value: number | boolean | string;
}