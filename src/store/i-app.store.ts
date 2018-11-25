import { SymbolModel } from './../symbols/symbol.model';
import { Currency } from './../currencies/currency.model';
import { Ticker } from './../tickers/ticker.model';
import { Trade } from './../trades/trade.model';
import { Book } from './../books/book.model';

/**
 *
 * Redux store of the application.
 * There is a fake title property just to make redux running correctly.
 * Feel free to delete it when adding your store.
 * @interface IAppStore
 */
interface IAppStore {
	isLoading: boolean;
	currencies: Currency[];
	symbols: SymbolModel[];
	tickers: Ticker[];
	trades: Trade[];
	books: Book[];
}

export default IAppStore;
