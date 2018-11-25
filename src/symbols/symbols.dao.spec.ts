import { of } from 'rxjs';
import HTTPProxyService from './../services/http-proxy.service';
import { SymbolModel, IRawSymbol } from './../symbols/symbol.model';

const symb: SymbolModel = new SymbolModel('BTCUSD', 5, '30.0', '15.0', '2000.0', '0.002', 'NA', true);
const symbols: SymbolModel[] = [symb];
const rawSymbol: any = {
	pair: 'btcusd',
	price_precision: 5,
	initial_margin: '30.0',
	minimum_margin: '15.0',
	maximum_order_size: '2000.0',
	minimum_order_size: '0.002',
	expiration: 'NA',
	margin: true
};
const resp: any = [rawSymbol];
const mockGet = jest.spyOn(HTTPProxyService, 'get').mockReturnValue(of(resp));
const mockBuildFromRawSymbol = jest.spyOn(SymbolModel, 'buildFromRawSymbol').mockImplementation(() => symb);

import { SymbolsDAO } from './symbols.dao';

describe('Currencies DAO', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});
	afterEach(() => {
		jest.clearAllMocks();
		jest.runOnlyPendingTimers();
	});

	it('should be defined', () => {
		expect(SymbolsDAO).toBeDefined();
	});

	it('should define RESOURCE_PATH', () => {
		expect(SymbolsDAO.RESOURCE_PATH).toEqual('http://localhost:9000/https://api.bitfinex.com/v1/symbols_details');
	});

	it('should define the exposed methods', () => {
		expect(typeof SymbolsDAO.fetch).toEqual('function');
	});

	describe('fetch', () => {
		it('should call the HTTPProxyService.get method', () => {
			SymbolsDAO.fetch().subscribe();
			expect(mockGet).toHaveBeenCalledWith(SymbolsDAO.RESOURCE_PATH);
		});

		it('should call the SymbolModel.buildFromRawSymbol method', () => {
			SymbolsDAO.fetch().subscribe();
			expect(mockBuildFromRawSymbol).toHaveBeenCalledWith(rawSymbol);
		});

		it('should return an observable of currencies', async () => {
			const res: SymbolModel[] = await SymbolsDAO.fetch().toPromise();
			expect(res).toEqual(symbols);
		});
	});
});
