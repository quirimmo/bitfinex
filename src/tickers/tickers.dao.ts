import { Observable, of } from 'rxjs';
import HTTPProxyService from './../services/http-proxy.service';
import { Ticker } from './ticker.model';
import { tap, map } from 'rxjs/operators';

export class TickersDAO {
	public static readonly RESOURCE_PATH = 'http://localhost:9000/https://api.bitfinex.com/v2/tickers';

	public static fetch(symbols: string[] | string = 'ALL'): Observable<Ticker[]> {
		// get the string of all the given array of symbol
		if (Array.isArray(symbols)) {
			symbols = symbols.join(',');
		}
		// safety conversion to uppercase for each element
		symbols = symbols.toUpperCase();
		return HTTPProxyService.get(TickersDAO.RESOURCE_PATH, {
			params: {
				symbols
			}
		}).pipe(map(onMapRxjs));

		function onMapRxjs(data: any): Ticker[] {
			return data.map((el: any) => Ticker.buildFromRawTicker(el));
		}
	}

	private constructor() {}
}
