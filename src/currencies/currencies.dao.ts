import { Currency } from './currency.model';
import { Observable } from 'rxjs';
import HTTPProxyService from '../services/http-proxy.service';
import { map } from 'rxjs/operators';

export class CurrenciesDAO {
	public static readonly RESOURCE_PATH =
		'http://localhost:9000/https://api.bitfinex.com/v2/conf/pub:map:currency:label,pub:map:currency:sym,pub:map:currency:unit';

	public static fetch(): Observable<Currency[]> {
		return HTTPProxyService.get(CurrenciesDAO.RESOURCE_PATH).pipe(map(onRxjsMap));

		function onRxjsMap(resp: any): Currency[] {
			const rawCurrencies: string[][] = resp[0];
			const rawCurrenciesMapping: string[][] = resp[1];
			const currencies: Currency[] = rawCurrencies.map((rawCurrency: string[]) => Currency.buildFromRaw(rawCurrency, rawCurrenciesMapping));
			return currencies;
		}
	}

	private constructor() {}
}
