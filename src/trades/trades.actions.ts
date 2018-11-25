import { Trade } from './trade.model';
import { Observable } from 'rxjs';
import { TradesDAO } from './trades.dao';
import { map } from 'rxjs/operators';
import { AnyAction } from 'redux';

export interface ITradesAction extends AnyAction {
	type: string;
	payload: any;
}

// fetching
// ==============================

export const FETCH_TRADES: string = 'FETCH_TRADES';
export const fetchTradesFulfilled = (trades: Trade[]): ITradesAction => ({ type: FETCH_TRADES, payload: trades });
export const fetchTrades = (symbol: string): Observable<Trade[]> => TradesDAO.fetch(symbol);
export const fetchTradesThunk = (symbol: string) => (dispatch: any) =>
	fetchTrades(symbol).pipe(map((trades: Trade[]) => dispatch(fetchTradesFulfilled(trades))));

// adding
// ==============================
export const ADD_TRADE: string = 'ADD_TRADE';
export const addTrade = (trade: Trade): ITradesAction => ({ type: ADD_TRADE, payload: trade });

// updating
// ==============================
export const UPDATE_TRADE: string = 'UPDATE_TRADE';
export const updateTrade = (trade: Trade): ITradesAction => ({ type: UPDATE_TRADE, payload: trade });
