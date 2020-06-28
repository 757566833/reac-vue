
import INITIAL_STATE, { IState } from './state';
import { IAction } from './action';

const reducer = (state: IState = INITIAL_STATE, action: IAction): IState => {
  switch (action.type) {
    case 'layouts/base':
      switch (action.func) {
        case 'setMenus':
          return {
            ...state,
            menus: action.menus,
          };

        case 'setAuthorityMap':
          return {
            ...state,
            authorityMap: action.authorityMap,
          };

        case 'setModuleMap':
          return {
            ...state,
            moduleMap: action.moduleMap,
          };
        default:
          return state;
      }
    default:
      return state;
  }
};
export default reducer;
