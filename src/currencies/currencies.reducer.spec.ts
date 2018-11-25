import { currencies } from './currencies.reducer';
import { FETCH_CURRENCIES } from './currencies.actions';
import { Currency } from './currency.model';

const initialState: Currency[] = [];
const NOT_EXISTENT_ACTION = {
	type: 'NOT_EXISTENT',
	payload: new Currency('not-existent-symbol', 'not-existent-currency')
};
const currency: Currency = new Currency('symbol', 'my currency name');

describe('currencies', () => {
	it('should be defined', () => {
		expect(currencies).toBeDefined();
		expect(typeof currencies).toEqual('function');
	});

	it('should return the initial state if the action not exist', () => {
		expect(currencies(initialState, NOT_EXISTENT_ACTION)).toEqual(initialState);
	});

	it('should fetch the currencies', () => {
		const state = currencies([], { type: FETCH_CURRENCIES, payload: [currency] });
		expect(state).toEqual([currency]);
	});
});
