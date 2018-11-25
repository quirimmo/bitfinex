import { FETCH_USERS, ADD_USER, DELETE_USER, UPDATE_USER } from './app.actions';

export const users = (state: any = [], action: any): any => {
	switch (action.type) {
		case FETCH_USERS:
			return action.users;
		case ADD_USER:
			return state.concat([action.user]);
		case DELETE_USER:
			return state.filter((user: any) => user.id !== action.user.id);
		case UPDATE_USER:
			return state.map((user: any) => {
				if (user.id !== action.user.id) {
					return user;
				}
				return {
					...user,
					...action.user
				};
			});
		default:
			return state;
	}
};
