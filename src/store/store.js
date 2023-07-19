import { compose, createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import  storage from 'redux-persist/lib/storage';
import { loggerMiddleware } from './middleware/logger';
import { rootReducer } from './root-reducer';
import thunk from 'redux-thunk';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']

}

//const middleWare = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean);//We can use this middleware also.

const persistedReducer = persistReducer(persistConfig, rootReducer);


const middleWares = [loggerMiddleware, thunk];

const composeEnhancer = (
  process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);