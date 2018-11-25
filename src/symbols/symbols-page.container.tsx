import { connect } from 'react-redux';
import IAppStore from './../store/i-app.store';
import { SymbolsPage } from './symbols-page.presentational';
import { Observable } from 'rxjs';
import { Trade } from './../trades/trade.model';
import { fetchTradesThunk, addTrade, updateTrade } from './../trades/trades.actions';
import { Book } from './../books/book.model';
import { fetchBooksThunk, updateBook } from './../books/books.actions';

const mapStateToProps = (state: IAppStore, ownProps: any) => {
	const currentSymbol: string = ownProps.currentSymbol;
	return {
		currentSymbol,
		tickers: state.tickers,
		symbols: state.symbols,
		trades: state.trades,
		books: state.books
	};
};

const mapDispatchToProps: any = (dispatch: any) => ({
	fetchTrades: (symbol: string): Observable<Trade[]> => dispatch(fetchTradesThunk(symbol)),
	fetchBooks: (symbol: string): Observable<Book[]> => dispatch(fetchBooksThunk(symbol)),
	addTrade: (trade: Trade) => dispatch(addTrade(trade)),
	updateTrade: (trade: Trade) => dispatch(updateTrade(trade)),
	addBook: (book: Trade) => dispatch(updateTrade(book)),
	updateBook: (book: Book) => dispatch(updateBook(book))
});

export const SymbolPageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(SymbolsPage);
