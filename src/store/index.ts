import { createStore, applyMiddleware, AnyAction } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import ReduxPromise from 'redux-promise';
import { createRootReducer } from './reducers';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { StoreState } from '../types/store';
import { localStorageMiddleware } from './middlewares';


/** If you want to add more than one middleware */

const rootReducer = createRootReducer();

const extraArgument = {
  
};
export type ExtraArgument = typeof extraArgument;

const thunkMiddleware = thunk.withExtraArgument(extraArgument) as ThunkMiddleware<StoreState, AnyAction>;

const middlewares = [thunkMiddleware, ReduxPromise, localStorageMiddleware]


export function initializeStore (initialState = {}) {
  return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)))
}
