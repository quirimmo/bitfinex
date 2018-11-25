import { SymbolModel } from './symbol.model';
import { FETCH_SYMBOLS, ISymbolsAction } from './symbols.actions';

export const symbols = (state: SymbolModel[] = [], action: ISymbolsAction): any => {
	switch (action.type) {
		case FETCH_SYMBOLS:
			return action.payload;
		default:
			return state;
	}
};
