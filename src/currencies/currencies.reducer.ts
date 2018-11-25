import { Currency } from './currency.model';
import { FETCH_CURRENCIES, ICurrenciesAction } from './currencies.actions';

export const currencies = (state: Currency[] = [], action: ICurrenciesAction): any => {
	switch (action.type) {
		case FETCH_CURRENCIES:
			return action.payload;
		default:
			return state;
	}
};
