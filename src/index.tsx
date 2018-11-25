import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import history from './routes/main-history';
import reducers from './store/reducers';
import AppContainer from './app/app.container';

// to supply the missing of __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__() properties
// for not having a static type error
declare var window: any;
// Adding the redux devtools extension. Feel free to remove it if you don't want to use this extension.
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Creating the main store of the app, adding as middlewares thunk and the redux dev tools extension
const store = createStore(reducers, composeEnhancer(applyMiddleware(thunk)));
const MainApp = ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<AppContainer />
		</Router>
	</Provider>,
	document.getElementById('app') as HTMLElement
);

export default MainApp;
