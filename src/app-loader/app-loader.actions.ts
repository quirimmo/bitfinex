export const START_LOADING: string = 'START_LOADING';
export const STOP_LOADING: string = 'STOP_LOADING';

export const startLoading = () => ({
	type: START_LOADING
});

export const stopLoading = () => ({
	type: STOP_LOADING
});
