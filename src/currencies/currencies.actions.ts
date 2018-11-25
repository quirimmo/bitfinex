import { Currency } from './currency.model';
import { Observable } from 'rxjs';
import { CurrenciesDAO } from './../currencies/currencies.dao';
import { map } from 'rxjs/operators';
import { AnyAction } from 'redux';

export interface ICurrenciesAction extends AnyAction {
	type: string;
	payload: Currency[] | Currency;
}

// fetching
// ==============================

export const FETCH_CURRENCIES: string = 'FETCH_CURRENCIES';
export const fetchCurrenciesFulfilled = (currencies: Currency[]): ICurrenciesAction => ({ type: FETCH_CURRENCIES, payload: currencies });
export const fetchCurrencies = (): Observable<Currency[]> => CurrenciesDAO.fetch();
export const fetchCurrenciesThunk = () => (dispatch: any) =>
	fetchCurrencies().pipe(map((currencies: Currency[]) => dispatch(fetchCurrenciesFulfilled(currencies))));
