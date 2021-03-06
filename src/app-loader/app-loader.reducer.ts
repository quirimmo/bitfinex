export const isLoading = (state: boolean = false, action: any): boolean => {
	switch (action.type) {
		case 'START_LOADING':
			return true;
		case 'STOP_LOADING':
			return false;
		default:
			return state;
	}
};
