import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as currenciesActions from './currencies.actions';
import { CurrenciesDAO } from './../currencies/currencies.dao';
import { of } from 'rxjs';
import { Currency } from './currency.model';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
const currency: Currency = new Currency('symbol', 'my currency');
const currencies: Currency[] = [currency];

const mockFetch = jest.spyOn(CurrenciesDAO, 'fetch').mockReturnValue(of(currencies));

describe('app actions', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});
	afterEach(() => {
		jest.clearAllMocks();
		jest.runOnlyPendingTimers();
	});

	it('should be defined', () => {
		expect(currenciesActions).toBeDefined();
	});

	describe('action types', () => {
		it('should define the FETCH_CURRENCIES action type', () => {
			expect(currenciesActions.FETCH_CURRENCIES).toEqual('FETCH_CURRENCIES');
		});
	});

	describe('plain actions', () => {
		it('should define the fetchUsers plain action', () => {
			expect(currenciesActions.fetchCurrenciesFulfilled(currencies)).toEqual({
				type: currenciesActions.FETCH_CURRENCIES,
				payload: currencies
			});
		});
	});

	describe('thunk actions', () => {
		describe('fetchCurrenciesThunk', () => {
			it('should call the CurrenciesDAO.fetch method', () => {
				currenciesActions
					.fetchCurrenciesThunk()(store.dispatch)
					.subscribe();
				expect(mockFetch).toHaveBeenCalled();
			});

			it('should dispatch the fetchUserFulfilled plain action', () => {
				const spy = jest.spyOn(store, 'dispatch');
				currenciesActions
					.fetchCurrenciesThunk()(store.dispatch)
					.subscribe();
				expect(spy).toHaveBeenCalledWith(currenciesActions.fetchCurrenciesFulfilled(currencies));
			});
		});
	});
});
