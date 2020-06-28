import { IMenuBean, EMenuType, module } from './interface';
const finance: IMenuBean = {
  title: 'menu3',
  type: EMenuType.Header,
  path: '/finance/',
  authority: 'pc-finance',
  module: module.react,
 
};
export default finance;
