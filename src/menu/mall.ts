import { IMenuBean, EMenuType, module } from './interface';

const mall: IMenuBean = {
  title: 'menu2',
  type: EMenuType.Header,
  path: '/mall',
  authority: 'pc-business-management',
  module: module.react,
};
export default mall;
