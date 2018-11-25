import { SymbolModel } from './symbol.model';
import { Observable } from 'rxjs';
import { SymbolsDAO } from './../symbols/symbols.dao';
import { map } from 'rxjs/operators';
import { AnyAction } from 'redux';

export interface ISymbolsAction extends AnyAction {
	type: string;
	payload: SymbolModel[] | SymbolModel;
}

// fetching
// ==============================

export const FETCH_SYMBOLS: string = 'FETCH_SYMBOLS';
export const fetchSymbolsFulfilled = (symbols: SymbolModel[]): ISymbolsAction => ({ type: FETCH_SYMBOLS, payload: symbols });
export const fetchSymbols = (): Observable<SymbolModel[]> => SymbolsDAO.fetch();
export const fetchSymbolsThunk = () => (dispatch: any) =>
	fetchSymbols().pipe(map((symbols: SymbolModel[]) => dispatch(fetchSymbolsFulfilled(symbols))));
