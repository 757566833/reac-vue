import { createStore, Store } from 'redux';
import reducer from './reducer';
import { IState } from './state';
import { IAction } from './action';
const store: Store<IState, IAction> = createStore(reducer);
export default store;
