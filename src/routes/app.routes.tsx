declare function require(moduleName: string): any;
const AnimatedSwitch = require('react-router-transition').AnimatedSwitch;

import * as React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import HomeRouter from './home/home.router';
import AppNavigation from './../app-navigation/app-navigation.presentational';
import { SymbolRouter } from './symbol/symbol.router';

/**
 * App Routes Component included by the App Presentational Component.
 * It defines all the routes of the application and any other feature related to the routes, like the redirect component.
 * Add here your new Routes or any other redirect rule and so on.
 * This component should contain all the route features of the global app.
 * @class AppRoutes
 * @extends {React.Component<any, any>}
 */
class AppRoutes extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	public render() {
		return (
			<BrowserRouter basename="/">
				<React.Fragment>
					<AppNavigation />
					<AnimatedSwitch
						atEnter={{ opacity: 0, left: -500 }}
						atLeave={{ opacity: 0, left: 2500 }}
						atActive={{ opacity: 1, left: 0 }}
						className="switch-wrapper"
					>
						<Route exact={true} path="/" component={HomeRouter} />
						<Route exact={true} path="/symbol/:pair" component={SymbolRouter} name="symbol" />
						<Redirect from="*" to="/" />
					</AnimatedSwitch>
				</React.Fragment>
			</BrowserRouter>
		);
	}
}

export default AppRoutes;
