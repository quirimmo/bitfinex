import { Ticker } from './ticker.model';
import { ITickersAction, FETCH_TICKERS } from './tickers.actions';

export const tickers = (state: Ticker[] = [], action: ITickersAction): any => {
	switch (action.type) {
		case FETCH_TICKERS:
			return action.payload;
		default:
			return state;
	}
};
