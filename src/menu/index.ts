import { IMenuBean } from './interface';
import basics from './basics';
import mall from './mall';
import assets from './assets';
import finance from './finance';
import config from './config';

const menu: IMenuBean[] = [
  basics, // 运营管理
  mall, // 业务管理
  finance, // 财务
  assets, // 资产
  config, // 设置

];
export default menu;
