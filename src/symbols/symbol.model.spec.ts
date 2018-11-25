import { SymbolModel, IRawSymbol } from './symbol.model';

let symbol: SymbolModel;

describe('Symbol', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		symbol = new SymbolModel('BTCUSD', 5, '30.0', '15.0', '2000.0', '0.002', 'NA', true);
	});
	afterEach(() => {
		jest.clearAllMocks();
		jest.runOnlyPendingTimers();
	});

	it('should be defined', () => {
		expect(SymbolModel).toBeDefined();
	});

	it('should create an instance', () => {
		expect(symbol).toBeInstanceOf(SymbolModel);
	});

	it('should define the static methods', () => {
		expect(typeof SymbolModel.buildFromRawSymbol).toEqual('function');
	});

	describe('buildFromRawSymbol', () => {
		it('should create the symbol instance from the raw symbol object', () => {
			const rawSymbol: IRawSymbol = {
				pair: 'btcusd',
				price_precision: 5,
				initial_margin: '30.0',
				minimum_margin: '15.0',
				maximum_order_size: '2000.0',
				minimum_order_size: '0.002',
				expiration: 'NA',
				margin: true
			};
			expect(SymbolModel.buildFromRawSymbol(rawSymbol)).toEqual(symbol);
		});
	});
});
