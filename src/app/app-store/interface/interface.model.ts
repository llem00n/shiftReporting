export declare type InterfaceType = 'PIAFAttributes' | 'PIAFEventFrames' | 'Excel' | 'Xml' | 'DatabaseTable';



export interface Interface {
  interfaceID: number;
  name: InterfaceType;
  description: string;
  setting1: string;
  setting2: string;
  setting3: string;
  setting4: string;
  setting5: string;
  isActive: boolean;
  interfaceType: InterfaceType;
  updating?: boolean; 
}

