import { Ticker } from './ticker.model';

let ticker: Ticker;
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

const fTicker: Ticker = new Ticker('fZRX');
fTicker.frr = 0.00001182;
fTicker.bid = 0.00002042;
fTicker.bidPeriod = 30;
fTicker.bidSize = 23332.00060009;
fTicker.ask = 0.0000077;
fTicker.askPeriod = 2;
fTicker.askSize = 215853.29474889;
fTicker.dailyChange = 0.00000429;
fTicker.dailyChangePerc = 0.0429;
fTicker.lastPrice = 0.0000077;
fTicker.volume = 298386.24889766;
fTicker.high = 0.00002042;
fTicker.low = 5e-7;

describe('Symbol', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		ticker = new Ticker('symbol');
	});
	afterEach(() => {
		jest.clearAllMocks();
		jest.runOnlyPendingTimers();
	});

	it('should be defined', () => {
		expect(Ticker).toBeDefined();
	});

	it('should create an instance', () => {
		expect(ticker).toBeInstanceOf(Ticker);
	});

	it('should define the static methods', () => {
		expect(typeof Ticker.buildFromRawTicker).toEqual('function');
	});

	it('should define the instance methods', () => {
		expect(typeof ticker.isT).toEqual('function');
	});

	describe('buildFromRawTicker', () => {
		it('should create the t ticker from the raw ticker object', () => {
			const rawTTicker: any = ['tBTCUSD', 4576.8, 90.08694928, 4576.9, 41.37405916, -173.2, -0.0365, 4576.8, 27866.33439392, 4750, 4460];
			expect(Ticker.buildFromRawTicker(rawTTicker)).toEqual(tTicker);
		});

		it('should create the f ticker from the raw ticker object', () => {
			const rawFTicker: any = [
				'fZRX',
				0.00001182,
				0.00002042,
				30,
				23332.00060009,
				0.0000077,
				2,
				215853.29474889,
				0.00000429,
				0.0429,
				0.0000077,
				298386.24889766,
				0.00002042,
				5e-7,
				null,
				null,
				129581.60244129
			];
			expect(Ticker.buildFromRawTicker(rawFTicker)).toEqual(fTicker);
		});
	});
});
