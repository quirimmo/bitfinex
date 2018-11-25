import { combineReducers } from 'redux';
import { isLoading } from './../app-loader/app-loader.reducer';
import { symbols } from './../symbols/symbols.reducer';
import { currencies } from './../currencies/currencies.reducer';
import { tickers } from './../tickers/tickers.reducer';
import { trades } from './../trades/trades.reducer';
import { books } from './../books/books.reducer';

/**
 * All the reducers of your application.
 */
const reducers = combineReducers({ isLoading, currencies, symbols, tickers, trades, books });

export default reducers;
