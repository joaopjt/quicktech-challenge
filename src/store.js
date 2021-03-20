import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { routerMiddleware } from 'react-router-redux'
import { createBrowserHistory } from 'history';
import storeSynchronize from 'redux-localstore';

import reducer from './reducer';

export const history = createBrowserHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
  return applyMiddleware(myRouterMiddleware);
};

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 10 });

export const store = createStore(
  reducer, composeEnhancers(getMiddleware()));

storeSynchronize(store);