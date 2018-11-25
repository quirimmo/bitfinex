import { Book } from './book.model';
import { IBooksAction, FETCH_BOOKS, ADD_BOOK, UPDATE_BOOK } from './books.actions';

export const books = (state: Book[] = [], action: IBooksAction): any => {
	switch (action.type) {
		case FETCH_BOOKS:
			return action.payload;
		case ADD_BOOK:
			// avoid ts complains
			const values: Book[] = [];
			return values.concat(action.payload).concat(state);
		// case UPDATE_BOOK:
		// 	return state.map(item => {
		// 		if (item.id !== action.payload.id) {
		// 			return item;
		// 		}
		// 		return {
		// 			...item,
		// 			...action.payload
		// 		};
		// 	});
		default:
			return state;
	}
};
