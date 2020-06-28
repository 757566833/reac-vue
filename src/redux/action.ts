import { IMenus, IAuthorityMap, IModuleMap } from './state';
export interface IBaseSetMenus {
  type: 'layouts/base',
  func: 'setMenus',
  menus: IMenus
}
export interface IBaseSetAuthorityMap {
  type: 'layouts/base',
  func: 'setAuthorityMap',
  authorityMap: IAuthorityMap
}
export interface IBaseSetModuleMap {
  type: 'layouts/base',
  func: 'setModuleMap',
  moduleMap: IModuleMap
}
export const setMenusOnBase = (menus: IMenus): IBaseSetMenus => {
  return {
    type: 'layouts/base',
    func: 'setMenus',
    menus,
  };
};
export const setAuthorityMapOnBase = (authorityMap: IAuthorityMap)
  : IBaseSetAuthorityMap => {
  return {
    type: 'layouts/base',
    func: 'setAuthorityMap',
    authorityMap,
  };
};
export const setModuleMapOnBase = (moduleMap:IModuleMap)
  : IBaseSetModuleMap => {
  return {
    type: 'layouts/base',
    func: 'setModuleMap',
    moduleMap,
  };
};

export type IAction = IBaseSetMenus | IBaseSetAuthorityMap | IBaseSetModuleMap
