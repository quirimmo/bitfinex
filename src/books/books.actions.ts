import { Book } from './book.model';
import { Observable } from 'rxjs';
import { BooksDAO } from './books.dao';
import { map } from 'rxjs/operators';
import { AnyAction } from 'redux';

export interface IBooksAction extends AnyAction {
	type: string;
	payload: any;
}

// fetching
// ==============================

export const FETCH_BOOKS: string = 'FETCH_BOOKS';
export const fetchBooksFulfilled = (books: Book[]): IBooksAction => ({ type: FETCH_BOOKS, payload: books });
export const fetchBooks = (symbol: string): Observable<Book[]> => BooksDAO.fetch(symbol);
export const fetchBooksThunk = (symbol: string) => (dispatch: any) =>
	fetchBooks(symbol).pipe(map((books: Book[]) => dispatch(fetchBooksFulfilled(books))));

// adding
// ==============================
export const ADD_BOOK: string = 'ADD_BOOK';
export const addBook = (book: Book): IBooksAction => ({ type: ADD_BOOK, payload: book });

// updating
// ==============================
export const UPDATE_BOOK: string = 'UPDATE_BOOK';
export const updateBook = (book: Book): IBooksAction => ({ type: UPDATE_BOOK, payload: book });
