import { SymbolModel } from './symbol.model';
import { Observable } from 'rxjs';
import HTTPProxyService from '../services/http-proxy.service';
import { map } from 'rxjs/operators';

export class SymbolsDAO {
	public static readonly RESOURCE_PATH = 'http://localhost:9000/https://api.bitfinex.com/v1/symbols_details';

	public static fetch(): Observable<SymbolModel[]> {
		return HTTPProxyService.get(SymbolsDAO.RESOURCE_PATH).pipe(map(onRxjsMap));

		function onRxjsMap(resp: any): SymbolModel[] {
			return resp.map((item: any) => SymbolModel.buildFromRawSymbol(item));
		}
	}

	private constructor() {}
}
