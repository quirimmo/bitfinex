import * as React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './../../assets/styles/main.scss';
import { Container, Button } from 'reactstrap';
import AppRoutes from './../routes/app.routes';
import AppLoaderContainer from './../app-loader/app-loader.container';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { ITickersAction } from './../tickers/tickers.actions';
import { ICurrenciesAction } from './../currencies/currencies.actions';
import { ISymbolsAction } from './../symbols/symbols.actions';

export interface IAppProps {
	stopLoading: () => any;
	startLoading: () => any;
	fetchSymbols: () => Observable<ISymbolsAction>;
	fetchCurrencies: () => Observable<ICurrenciesAction>;
	fetchTickers: () => Observable<ITickersAction>;
}

/**
 * Main App Presentational Component which is the root of your React application.
 * @class App
 * @extends {React.Component<any, any>}
 */
class App extends React.Component<IAppProps, any> {
	constructor(props: IAppProps) {
		super(props);
	}

	public componentDidMount() {
		const that: App = this;
		this.props.startLoading();
		const subscription: Subscription = forkJoin(this.props.fetchCurrencies(), this.props.fetchTickers(), this.props.fetchSymbols()).subscribe(
			onSubscribe,
			onError,
			onFinally
		);

		function onSubscribe(data: any) {
			console.log('loaded data', data);
		}

		function onError(err: any) {
			console.error('Error fetching the users:', err);
		}

		function onFinally() {
			if (subscription) {
				subscription.unsubscribe();
			}
			that.props.stopLoading();
		}
	}

	public render() {
		return (
			<React.Fragment>
				<div className="app-loader-wrapper">
					<AppLoaderContainer />
				</div>
				<Container fluid={true}>
					<AppRoutes />
				</Container>
			</React.Fragment>
		);
	}
}

export default App;
