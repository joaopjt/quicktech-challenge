import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, history} from './store';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import Main from './app';

console.log(ReactDOM);

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
    	<Switch>
	        <Route path="/" component={Main} />
	    </Switch>
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));