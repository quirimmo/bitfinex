import { START_LOADING, STOP_LOADING, startLoading, stopLoading } from './app-loader.actions';

describe('app-loader-actions', () => {
	it('should define the action types', () => {
		expect(START_LOADING).toEqual('START_LOADING');
		expect(STOP_LOADING).toEqual('STOP_LOADING');
	});

	it('should define the startLoading action', () => {
		expect(startLoading()).toEqual({ type: START_LOADING });
	});

	it('should define the stopLoading action', () => {
		expect(stopLoading()).toEqual({ type: STOP_LOADING });
	});
});
