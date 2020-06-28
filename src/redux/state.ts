import { IMenuBean } from '@/menu/interface';
export type IMenus = IMenuBean[]
export type IAuthorityMap = { [key: string]: boolean }
export type IModuleMap = { [key: string]: 'r' | 'v' } | null
export interface IState {
  menus: IMenus,
  authorityMap: IAuthorityMap,
  moduleMap: IModuleMap
}
const INITIAL_STATE: IState = {
  'menus': [],
  'authorityMap': {},
  'moduleMap': null,
};
export default INITIAL_STATE;
