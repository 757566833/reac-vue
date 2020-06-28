import { IMenuBean, EMenuType, module } from './interface';

const config: IMenuBean = {
  title: 'menu5',
  type: EMenuType.Header,
  path: '/config/',
  authority: 'pc-setup',
  module: module.react,
 
};
export default config;
