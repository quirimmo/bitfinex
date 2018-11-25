import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as tickersActions from './tickers.actions';
import { TickersDAO } from './../tickers/tickers.dao';
import { of } from 'rxjs';
import { Ticker } from './ticker.model';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
const ticker: Ticker = new Ticker('tBTCUSD');
ticker.bid = 4576.8;
ticker.bidSize = 90.08694928;
ticker.ask = 4576.9;
ticker.askSize = 41.37405916;
ticker.dailyChange = -173.2;
ticker.dailyChangePerc = -0.0365;
ticker.lastPrice = 4576.8;
ticker.volume = 27866.33439392;
ticker.high = 4750;
ticker.low = 4460;

const tickers: Ticker[] = [ticker];
const mockFetch = jest.spyOn(TickersDAO, 'fetch').mockReturnValue(of(tickers));

describe('tickers actions', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});
	afterEach(() => {
		jest.clearAllMocks();
		jest.runOnlyPendingTimers();
	});

	it('should be defined', () => {
		expect(tickersActions).toBeDefined();
	});

	describe('action types', () => {
		it('should define the FETCH_TICKERS action type', () => {
			expect(tickersActions.FETCH_TICKERS).toEqual('FETCH_TICKERS');
		});
	});

	describe('plain actions', () => {
		it('should define the fetchTicker plain action', () => {
			expect(tickersActions.fetchTickersFulfilled(tickers)).toEqual({
				type: tickersActions.FETCH_TICKERS,
				payload: tickers
			});
		});
	});

	describe('thunk actions', () => {
		describe('fetchTickersThunk', () => {
			it('should call the TickersDAO.fetch method', () => {
				tickersActions
					.fetchTickersThunk()(store.dispatch)
					.subscribe();
				expect(mockFetch).toHaveBeenCalled();
			});

			it('should dispatch the fetchTickersFulfilled plain action', () => {
				const spy = jest.spyOn(store, 'dispatch');
				tickersActions
					.fetchTickersThunk()(store.dispatch)
					.subscribe();
				expect(spy).toHaveBeenCalledWith(tickersActions.fetchTickersFulfilled(tickers));
			});
		});
	});
});
