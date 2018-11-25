import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as appActions from './app.actions';
import HTTPProxyService from './../services/http-proxy.service';
import { of } from 'rxjs';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
const user = {};
const newUser = {};
const users = [user];

let mockPost: any;
let mockGet: any;
let mockPut: any;
let mockDelete: any;

describe('app actions', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		mockPost = jest.spyOn(HTTPProxyService, 'post').mockImplementation(() => of({}));
		mockGet = jest.spyOn(HTTPProxyService, 'get').mockImplementation(() => of(users));
		mockPut = jest.spyOn(HTTPProxyService, 'put').mockImplementation(() => of({}));
		mockDelete = jest.spyOn(HTTPProxyService, 'delete').mockImplementation(() => of(newUser));
	});
	afterEach(() => {
		jest.clearAllMocks();
		jest.runOnlyPendingTimers();
	});

	it('should be defined', () => {
		expect(appActions).toBeDefined();
	});

	describe('action types', () => {
		it('should define the ADD_USER action type', () => {
			expect(appActions.ADD_USER).toEqual('ADD_USER');
		});

		it('should define the FETCH_USERS action type', () => {
			expect(appActions.FETCH_USERS).toEqual('FETCH_USERS');
		});

		it('should define the DELETE_USER action type', () => {
			expect(appActions.DELETE_USER).toEqual('DELETE_USER');
		});

		it('should define the UPDATE_USER action type', () => {
			expect(appActions.UPDATE_USER).toEqual('UPDATE_USER');
		});
	});

	describe('plain actions', () => {
		it('should define the addUser plain action', () => {
			expect(appActions.addUserFulfilled(user)).toEqual({
				type: appActions.ADD_USER,
				user
			});
		});

		it('should define the fetchUsers plain action', () => {
			expect(appActions.fetchUsersFulfilled(users)).toEqual({
				type: appActions.FETCH_USERS,
				users
			});
		});

		it('should define the deleteUser plain action', () => {
			expect(appActions.deleteUserFulfilled(user)).toEqual({
				type: appActions.DELETE_USER,
				user
			});
		});

		it('should define the updateUser plain action', () => {
			expect(appActions.updateUserFulfilled(user)).toEqual({
				type: appActions.UPDATE_USER,
				user
			});
		});
	});

	describe('thunk actions', () => {
		describe('addUserThunk', () => {
			it('should call the post method of HTTPProxyService', () => {
				appActions
					.addUserThunk(user)(store.dispatch)
					.subscribe();
				expect(mockPost).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users', user);
			});

			it('should dispatch the addUser plain action', () => {
				const spy = jest.spyOn(store, 'dispatch');
				appActions
					.addUserThunk(user)(store.dispatch)
					.subscribe();
				expect(spy).toHaveBeenCalledWith(appActions.addUserFulfilled(user));
			});
		});

		describe('fetchUsersThunk', () => {
			it('should call the get method of HTTPProxyService', () => {
				appActions
					.fetchUsersThunk()(store.dispatch)
					.subscribe();
				expect(mockGet).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
			});

			it('should dispatch the addUser plain action', () => {
				const spy = jest.spyOn(store, 'dispatch');
				appActions
					.fetchUsersThunk()(store.dispatch)
					.subscribe();
				expect(spy).toHaveBeenCalledWith(appActions.fetchUsersFulfilled(users));
			});
		});

		describe('deleteUserThunk', () => {
			it('should call the delete method of HTTPProxyService', () => {
				appActions
					.deleteUserThunk(user)(store.dispatch)
					.subscribe();
				expect(mockDelete).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/1');
			});

			it('should dispatch the deleteUser plain action', () => {
				const spy = jest.spyOn(store, 'dispatch');
				appActions
					.deleteUserThunk(user)(store.dispatch)
					.subscribe();
				expect(spy).toHaveBeenCalledWith(appActions.deleteUserFulfilled(user));
			});
		});

		describe('updateUserThunk', () => {
			it('should call the post method of HTTPProxyService', () => {
				appActions
					.updateUserThunk(user)(store.dispatch)
					.subscribe();
				expect(mockPut).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/1', user);
			});

			it('should dispatch the updateUser plain action', () => {
				const spy = jest.spyOn(store, 'dispatch');
				appActions
					.updateUserThunk(user)(store.dispatch)
					.subscribe();
				expect(spy).toHaveBeenCalledWith(appActions.updateUserFulfilled(user));
			});
		});
	});
});
