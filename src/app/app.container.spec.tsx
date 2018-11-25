import * as React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { of } from 'rxjs';

const mockFetchSymbolsThunk = jest.fn().mockReturnValue(of({ type: 'MOCKED_ACTION' }));
const mockFetchCurrenciesThunk = jest.fn().mockReturnValue(of({ type: 'MOCKED_ACTION' }));
const mockFetchTickersThunk = jest.fn().mockReturnValue(of({ type: 'MOCKED_ACTION' }));
jest.mock('./../currencies/currencies.actions.ts', () => ({
	fetchCurrenciesThunk: () => mockFetchCurrenciesThunk()
}));
jest.mock('./../symbols/symbols.actions.ts', () => ({
	fetchSymbolsThunk: () => mockFetchSymbolsThunk()
}));
jest.mock('./../tickers/tickers.actions.ts', () => ({
	fetchTickersThunk: () => mockFetchTickersThunk()
}));

const mockStopLoading = jest.fn().mockReturnValue({ type: 'MOCKED_ACTION' });
const mockStartLoading = jest.fn().mockReturnValue({ type: 'MOCKED_ACTION' });
jest.mock('./../app-loader/app-loader.actions.ts', () => ({
	stopLoading: () => mockStopLoading(),
	startLoading: () => mockStartLoading()
}));

import AppContainer from './app.container';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const currencies: any[] = [];
const symbols: any[] = [];
const tickers: any[] = [];
const isLoading: boolean = false;
const store = mockStore({ isLoading, currencies, symbols, tickers });
jest.spyOn(store, 'dispatch').mockImplementation(() => {});
let component: any;

describe('App Container Component', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		component = shallow(<AppContainer store={store} />);
	});
	afterEach(() => {
		jest.runOnlyPendingTimers();
		jest.clearAllMocks();
	});

	it('should define the component', () => {
		expect(component).toBeDefined();
	});

	describe('currencies', () => {
		it('should define the fetchCurrencies prop', () => {
			expect(typeof component.props().fetchCurrencies).toEqual('function');
		});

		it('should define the currencies prop', () => {
			expect(component.props().currencies).toEqual([]);
		});

		it('should dispatch the fetchCurrenciesThunk action', () => {
			component.props().fetchCurrencies();
			expect(mockFetchCurrenciesThunk).toHaveBeenCalled();
		});
	});

	describe('symbols', () => {
		it('should define the fetchSymbols prop', () => {
			expect(typeof component.props().fetchSymbols).toEqual('function');
		});

		it('should define the symbols prop', () => {
			expect(component.props().symbols).toEqual([]);
		});

		it('should dispatch the fetchSymbolsThunk action', () => {
			component.props().fetchSymbols();
			expect(mockFetchSymbolsThunk).toHaveBeenCalled();
		});
	});

	describe('tickers', () => {
		it('should define the fetchTickers prop', () => {
			expect(typeof component.props().fetchTickers).toEqual('function');
		});

		it('should define the tickers prop', () => {
			expect(component.props().tickers).toEqual([]);
		});

		it('should dispatch the fetchTickersThunk action', () => {
			component.props().fetchTickers();
			expect(mockFetchTickersThunk).toHaveBeenCalled();
		});
	});

	describe('loading', () => {
		it('should define the stopLoading prop', () => {
			expect(typeof component.props().stopLoading).toEqual('function');
		});

		it('should define the startLoading prop', () => {
			expect(typeof component.props().stopLoading).toEqual('function');
		});

		it('should dispatch the startLoading action', () => {
			component.props().startLoading();
			expect(mockStartLoading).toHaveBeenCalled();
		});

		it('should dispatch the stopLoading action', () => {
			component.props().stopLoading();
			expect(mockStopLoading).toHaveBeenCalled();
		});
	});
});
