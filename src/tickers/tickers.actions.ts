import { Ticker } from './ticker.model';
import { Observable } from 'rxjs';
import { TickersDAO } from './tickers.dao';
import { map } from 'rxjs/operators';
import { AnyAction } from 'redux';

export interface ITickersAction extends AnyAction {
	type: string;
	payload: Ticker[] | Ticker;
}

// fetching
// ==============================

export const FETCH_TICKERS: string = 'FETCH_TICKERS';
export const fetchTickersFulfilled = (tickers: Ticker[]): ITickersAction => ({ type: FETCH_TICKERS, payload: tickers });
export const fetchTickers = (): Observable<Ticker[]> => TickersDAO.fetch();
export const fetchTickersThunk = () => (dispatch: any) => fetchTickers().pipe(map((tickers: Ticker[]) => dispatch(fetchTickersFulfilled(tickers))));
