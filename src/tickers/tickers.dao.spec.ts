import { of } from 'rxjs';
import HTTPProxyService from './../services/http-proxy.service';
import { Ticker } from './../tickers/ticker.model';

const ticker = new Ticker('tBTCUSD');
const tTicker: Ticker = new Ticker('tBTCUSD');
tTicker.bid = 4576.8;
tTicker.bidSize = 90.08694928;
tTicker.ask = 4576.9;
tTicker.askSize = 41.37405916;
tTicker.dailyChange = -173.2;
tTicker.dailyChangePerc = -0.0365;
tTicker.lastPrice = 4576.8;
tTicker.volume = 27866.33439392;
tTicker.high = 4750;
tTicker.low = 4460;
const tickers: Ticker[] = [ticker];
const rawTicker: any = ['tBTCUSD', 4576.8, 90.08694928, 4576.9, 41.37405916, -173.2, -0.0365, 4576.8, 27866.33439392, 4750, 4460];
const resp: any = [rawTicker];
const mockGet = jest.spyOn(HTTPProxyService, 'get').mockReturnValue(of(resp));
const mockBuildFromRawSymbol = jest.spyOn(Ticker, 'buildFromRawTicker').mockImplementation(() => ticker);

import { TickersDAO } from './tickers.dao';

describe('Tickers DAO', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});
	afterEach(() => {
		jest.clearAllMocks();
		jest.runOnlyPendingTimers();
	});

	it('should be defined', () => {
		expect(TickersDAO).toBeDefined();
	});

	it('should define RESOURCE_PATH', () => {
		expect(TickersDAO.RESOURCE_PATH).toEqual('http://localhost:9000/https://api.bitfinex.com/v2/tickers');
	});

	it('should define the exposed methods', () => {
		expect(typeof TickersDAO.fetch).toEqual('function');
	});

	describe('fetch', () => {
		it('should call the HTTPProxyService.get method', () => {
			TickersDAO.fetch().subscribe();
			expect(mockGet).toHaveBeenCalledWith(TickersDAO.RESOURCE_PATH, { params: { symbols: 'ALL' } });
		});

		it('should call the SymbolModel.buildFromRawSymbol method', () => {
			TickersDAO.fetch().subscribe();
			expect(mockBuildFromRawSymbol).toHaveBeenCalledWith(rawTicker);
		});

		it('should return an observable of currencies', async () => {
			const tick: Ticker[] = await TickersDAO.fetch().toPromise();
			expect(tick).toEqual(tickers);
		});
	});
});
