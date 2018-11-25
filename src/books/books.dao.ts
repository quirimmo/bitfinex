import { Observable, of } from 'rxjs';
import HTTPProxyService from '../services/http-proxy.service';
import { Book } from './book.model';
import { tap, map } from 'rxjs/operators';

export class BooksDAO {
	// https://api.bitfinex.com/v2/book/tBTCUSD/P0
	public static readonly RESOURCE_PATH = 'http://localhost:9000/https://api.bitfinex.com/v2/book/';

	public static fetch(symbol: string, precision: string = 'P0'): Observable<Book[]> {
		const composedURL: string = `${BooksDAO.RESOURCE_PATH}/${symbol}/P0`;
		return HTTPProxyService.get(composedURL).pipe(map(onMapRxjs));

		function onMapRxjs(data: any): Book[] {
			return data.map((el: any) => Book.buildFromRaw(symbol, el));
		}
	}

	private constructor() {}
}
