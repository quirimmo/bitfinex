import { connect } from 'react-redux';
import App from './app.presentational';
import { stopLoading, startLoading } from './../app-loader/app-loader.actions';
import IAppStore from 'store/i-app.store';
import { Observable } from 'rxjs';
import { Ticker } from './../tickers/ticker.model';
import { fetchTickersThunk } from './../tickers/tickers.actions';
import { Currency } from './../currencies/currency.model';
import { fetchCurrenciesThunk } from './../currencies/currencies.actions';
import { SymbolModel } from './../symbols/symbol.model';
import { fetchSymbolsThunk } from './../symbols/symbols.actions';

const mapStateToProps = (state: IAppStore, ownProps: any) => ({});

const mapDispatchToProps: any = (dispatch: any) => ({
	startLoading: () => dispatch(startLoading()),
	stopLoading: () => dispatch(stopLoading()),
	fetchCurrencies: (): Observable<Currency[]> => dispatch(fetchCurrenciesThunk()),
	fetchSymbols: (): Observable<SymbolModel[]> => dispatch(fetchSymbolsThunk()),
	fetchTickers: (): Observable<Ticker[]> => dispatch(fetchTickersThunk())
});

const AppContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

export default AppContainer;
