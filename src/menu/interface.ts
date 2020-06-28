
export interface IMenuBean {
  title: string;
  path: string;
  module?: 'r' | 'v'
  type?: EMenuType;
  authority?: string;
  children?: IMenuBean[];
}
export enum EMenuType {
  SubMenu = 'SubMenu',
  Item = 'Item',
  NoMenu = 'NoMenu',
  Header = 'Header'
}
export enum module {
  react = 'r',
  vue = 'v'
}
