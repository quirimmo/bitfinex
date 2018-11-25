import { symbols } from './symbols.reducer';
import { FETCH_SYMBOLS } from './symbols.actions';
import { SymbolModel } from './symbol.model';

const initialState: SymbolModel[] = [];
const symb: SymbolModel = new SymbolModel('BTCUSD', 5, '30.0', '15.0', '2000.0', '0.002', 'NA', true);
const NOT_EXISTENT_ACTION = {
	type: 'NOT_EXISTENT',
	payload: [symb]
};

describe('symbols', () => {
	it('should be defined', () => {
		expect(symbols).toBeDefined();
		expect(typeof symbols).toEqual('function');
	});

	it('should return the initial state if the action not exist', () => {
		expect(symbols(initialState, NOT_EXISTENT_ACTION)).toEqual(initialState);
	});

	it('should fetch the symbols', () => {
		const state = symbols([], { type: FETCH_SYMBOLS, payload: [symb] });
		expect(state).toEqual([symb]);
	});
});
