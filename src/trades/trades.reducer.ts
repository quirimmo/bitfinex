import { Trade } from './trade.model';
import { ITradesAction, FETCH_TRADES, UPDATE_TRADE, ADD_TRADE } from './trades.actions';

export const trades = (state: Trade[] = [], action: ITradesAction): any => {
	switch (action.type) {
		case FETCH_TRADES:
			return action.payload;
		case ADD_TRADE:
			// avoid ts complains
			const values: Trade[] = [];
			return values.concat(action.payload).concat(state);
		case UPDATE_TRADE:
			return state.map(item => {
				if (item.id !== action.payload.id) {
					return item;
				}
				return {
					...item,
					...action.payload
				};
			});
		default:
			return state;
	}
};
