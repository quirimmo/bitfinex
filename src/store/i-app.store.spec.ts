import IAppStore from './i-app.store';
import { SymbolModel } from './../symbols/symbol.model';
import { Currency } from './../currencies/currency.model';
import { Ticker } from './../tickers/ticker.model';
import { Trade } from './../trades/trade.model';
import { Book } from './../books/book.model';

const isLoading: boolean = false;
const currencies: Currency[] = [];
const symbols: SymbolModel[] = [];
const tickers: Ticker[] = [];
const trades: Trade[] = [];
const books: Book[] = [];

const storeState: IAppStore = {
	isLoading,
	symbols,
	currencies,
	tickers,
	trades,
	books
};

describe('AppStore', () => {
	it('should be defined', () => {
		expect(storeState).toBeDefined();
	});

	it('should set the properties', () => {
		expect(storeState.isLoading).toEqual(isLoading);
	});
});
