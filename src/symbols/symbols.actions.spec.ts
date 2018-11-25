import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as symbolsActions from './symbols.actions';
import { SymbolsDAO } from './../symbols/symbols.dao';
import { of } from 'rxjs';
import { SymbolModel } from './symbol.model';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
const symbol: SymbolModel = new SymbolModel('BTCUSD', 5, '30.0', '15.0', '2000.0', '0.002', 'NA', true);
const symbols: SymbolModel[] = [symbol];

const mockFetch = jest.spyOn(SymbolsDAO, 'fetch').mockReturnValue(of(symbols));

describe('symbols actions', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});
	afterEach(() => {
		jest.clearAllMocks();
		jest.runOnlyPendingTimers();
	});

	it('should be defined', () => {
		expect(symbolsActions).toBeDefined();
	});

	describe('action types', () => {
		it('should define the FETCH_SYMBOLS action type', () => {
			expect(symbolsActions.FETCH_SYMBOLS).toEqual('FETCH_SYMBOLS');
		});
	});

	describe('plain actions', () => {
		it('should define the fetchSymbolsFulfilled plain action', () => {
			expect(symbolsActions.fetchSymbolsFulfilled(symbols)).toEqual({
				type: symbolsActions.FETCH_SYMBOLS,
				payload: symbols
			});
		});
	});

	describe('thunk actions', () => {
		describe('fetchSymbolsThunk', () => {
			it('should call the CurrenciesDAO.fetch method', () => {
				symbolsActions
					.fetchSymbolsThunk()(store.dispatch)
					.subscribe();
				expect(mockFetch).toHaveBeenCalled();
			});

			it('should dispatch the fetchSymbolsFulfilled plain action', () => {
				const spy = jest.spyOn(store, 'dispatch');
				symbolsActions
					.fetchSymbolsThunk()(store.dispatch)
					.subscribe();
				expect(spy).toHaveBeenCalledWith(symbolsActions.fetchSymbolsFulfilled(symbols));
			});
		});
	});
});
