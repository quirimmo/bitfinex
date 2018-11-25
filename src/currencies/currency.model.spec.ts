import { Currency } from './currency.model';

const rawCurrency1: any = ['ABS', 'The Abyss'];
const rawCurrency2: any = ['ADD', 'ADD'];
const currency1: Currency = new Currency('ABS', 'The Abyss');
const currency2: Currency = new Currency('ADD', 'ADD');
currency1.fullSymbol = 'ABYSS';
const rawCurrencyMapping1: any = ['ABS', 'ABYSS'];
const rawCurrenciesMapping: any = [rawCurrencyMapping1];

let currency: Currency;

describe('Currency', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		currency = new Currency('symbol', 'name');
	});
	afterEach(() => {
		jest.clearAllMocks();
		jest.runOnlyPendingTimers();
	});

	it('should be defined', () => {
		expect(Currency).toBeDefined();
	});

	it('should create an instance', () => {
		expect(currency).toBeInstanceOf(Currency);
	});

	it('should define the static methods', () => {
		expect(typeof Currency.buildFromRaw).toEqual('function');
	});

	it('should define the instance methods', () => {
		expect(typeof currency.isEqual).toEqual('function');
	});

	describe('buildFromRaw', () => {
		it('should return the currency without adding the full symbol property', () => {
			expect(Currency.buildFromRaw(rawCurrency2, rawCurrenciesMapping)).toEqual(currency2);
		});

		it('should return the currency with the full symbol property', () => {
			expect(Currency.buildFromRaw(rawCurrency1, rawCurrenciesMapping)).toEqual(currency1);
		});
	});

	describe('isEqual', () => {
		it('should return true passing same symbol string', () => {
			expect(currency.isEqual('symbol')).toBeTruthy();
		});

		it('should return false passing different symbol string', () => {
			expect(currency.isEqual('different symbol')).toBeFalsy();
		});

		it('should return true passing currency with same symbol', () => {
			expect(currency.isEqual(new Currency('symbol', 'name'))).toBeTruthy();
		});

		it('should return false passing currency with differnt symbol', () => {
			expect(currency.isEqual(new Currency('different symbol', 'name'))).toBeFalsy();
		});
	});
});
