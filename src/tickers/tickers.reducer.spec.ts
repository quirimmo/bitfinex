import { tickers } from './tickers.reducer';
import { FETCH_TICKERS } from './tickers.actions';
import { Ticker } from './ticker.model';

const initialState: Ticker[] = [];
const ticker: Ticker = new Ticker('BTCUSD');
const NOT_EXISTENT_ACTION = {
	type: 'NOT_EXISTENT',
	payload: [ticker]
};

describe('tickers', () => {
	it('should be defined', () => {
		expect(tickers).toBeDefined();
		expect(typeof tickers).toEqual('function');
	});

	it('should return the initial state if the action not exist', () => {
		expect(tickers(initialState, NOT_EXISTENT_ACTION)).toEqual(initialState);
	});

	it('should fetch the tickers', () => {
		const state = tickers([], { type: FETCH_TICKERS, payload: [ticker] });
		expect(state).toEqual([ticker]);
	});
});
