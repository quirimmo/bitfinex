import { Observable, of } from 'rxjs';
import HTTPProxyService from '../services/http-proxy.service';
import { Trade } from './trade.model';
import { tap, map } from 'rxjs/operators';

export class TradesDAO {
	public static readonly RESOURCE_PATH = 'http://localhost:9000/https://api.bitfinex.com/v2/trades';

	public static fetch(symbol: string): Observable<Trade[]> {
		const composedURL: string = `${TradesDAO.RESOURCE_PATH}/${symbol}/hist`;
		return HTTPProxyService.get(composedURL).pipe(map(onMapRxjs));

		function onMapRxjs(data: any): Trade[] {
			return data.map((el: any) => Trade.buildFromRaw(symbol, el));
		}
	}

	private constructor() {}
}
