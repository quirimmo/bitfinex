import { isLoading } from './app-loader.reducer';
import { START_LOADING, STOP_LOADING } from './app-loader.actions';

const initialState: boolean = false;
const NOT_EXISTENT_ACTION = {
	type: 'NOT_EXISTENT'
};

describe('isLoading', () => {
	it('should be defined', () => {
		expect(isLoading).toBeDefined();
		expect(typeof isLoading).toEqual('function');
	});

	it('should return the initial state if the action not exist', () => {
		expect(isLoading(initialState, NOT_EXISTENT_ACTION)).toEqual(initialState);
	});

	it('should set isLoading to true', () => {
		const state = isLoading(false, { type: START_LOADING });
		expect(state).toBeTruthy();
	});

	it('should set isLoading to false', () => {
		const state = isLoading(true, { type: STOP_LOADING });
		expect(state).toBeFalsy();
	});
});
