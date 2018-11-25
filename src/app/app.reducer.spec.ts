import { users } from './app.reducer';
import { ADD_USER, DELETE_USER, FETCH_USERS, UPDATE_USER } from './app.actions';

const initialState: string = 'react qbootstrap';
const NOT_EXISTENT_ACTION = {
	type: 'NOT_EXISTENT'
};

const user = { id: 1, name: 'item1' };
const updatedUser = { id: 1, name: 'updatedItem1' };

describe('users', () => {
	it('should be defined', () => {
		expect(users).toBeDefined();
		expect(typeof users).toEqual('function');
	});

	it('should return the initial state if the action not exist', () => {
		expect(users(initialState, NOT_EXISTENT_ACTION)).toEqual(initialState);
	});

	it('should add an user', () => {
		const state = users([], { type: ADD_USER, user });
		expect(state).toEqual([user]);
	});

	it('should delete an user', () => {
		const state = users([user], { type: DELETE_USER, user });
		expect(state).toEqual([]);
	});

	it('should fetch the users', () => {
		const state = users([], { type: FETCH_USERS, users: [user] });
		expect(state).toEqual([user]);
	});

	it('should update the user', () => {
		const state = users([user], { type: UPDATE_USER, user: updatedUser });
		expect(state).toEqual([updatedUser]);
	});
});
