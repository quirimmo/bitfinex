import { of } from 'rxjs';
import HTTPProxyService from './../services/http-proxy.service';
import { Currency } from './../currencies/currency.model';

const currency1: Currency = new Currency('ABS', 'The Abyss');
const currency2: Currency = new Currency('ADD', 'ADD');
const currency3: Currency = new Currency('AGI', 'SingularityNET');
const currencies: Currency[] = [currency1, currency2, currency3];
const rawCurrency1: any = ['ABS', 'The Abyss'];
const rawCurrency2: any = ['ADD', 'ADD'];
const rawCurrency3: any = ['AGI', 'SingularityNET'];
const rawCurrencies: any = [rawCurrency1, rawCurrency2, rawCurrency3];
const rawCurrencyMapping1: any = ['ABS', 'ABYSS'];
const rawCurrenciesMapping: any = [rawCurrencyMapping1];
const resp: any = [rawCurrencies, rawCurrenciesMapping];
const mockGet = jest.spyOn(HTTPProxyService, 'get').mockReturnValue(of(resp));
const mockBuildFromRaw = jest
	.spyOn(Currency, 'buildFromRaw')
	.mockImplementation((rawCurrency: any, mappings: any) => new Currency(rawCurrency[0], rawCurrency[1]));

import { CurrenciesDAO } from './currencies.dao';

describe('Currencies DAO', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});
	afterEach(() => {
		jest.clearAllMocks();
		jest.runOnlyPendingTimers();
	});

	it('should be defined', () => {
		expect(CurrenciesDAO).toBeDefined();
	});

	it('should define RESOURCE_PATH', () => {
		expect(CurrenciesDAO.RESOURCE_PATH).toEqual(
			'http://localhost:9000/https://api.bitfinex.com/v2/conf/pub:map:currency:label,pub:map:currency:sym,pub:map:currency:unit'
		);
	});

	it('should define the exposed methods', () => {
		expect(typeof CurrenciesDAO.fetch).toEqual('function');
	});

	describe('fetch', () => {
		it('should call the HTTPProxyService.get method', () => {
			CurrenciesDAO.fetch().subscribe();
			expect(mockGet).toHaveBeenCalledWith(CurrenciesDAO.RESOURCE_PATH);
		});

		it('should call the Currency.buildFromRaw method', () => {
			CurrenciesDAO.fetch().subscribe();
			expect(mockBuildFromRaw).toHaveBeenCalledTimes(3);
			expect(mockBuildFromRaw).toHaveBeenNthCalledWith(1, rawCurrency1, rawCurrenciesMapping);
			expect(mockBuildFromRaw).toHaveBeenNthCalledWith(2, rawCurrency2, rawCurrenciesMapping);
			expect(mockBuildFromRaw).toHaveBeenNthCalledWith(3, rawCurrency3, rawCurrenciesMapping);
		});

		it('should return an observable of currencies', async () => {
			const res: Currency[] = await CurrenciesDAO.fetch().toPromise();
			expect(res).toEqual(currencies);
		});
	});
});
