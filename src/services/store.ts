import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { socketMiddleware } from './socketMiddleware';
import { rootReducer } from './reducers';

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
  
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers( applyMiddleware( thunk ), applyMiddleware( socketMiddleware( wsUrl ) ) );

export const store = createStore( rootReducer, enhancer );