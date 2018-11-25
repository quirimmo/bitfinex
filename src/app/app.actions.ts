import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import HTTPProxyService from './../services/http-proxy.service';

// adding
// ==============================

export const ADD_USER = 'ADD_USER';
export const addUserFulfilled = (user: any) => ({ type: ADD_USER, user });
export const addUser = (user: any): Observable<any> => HTTPProxyService.post('https://jsonplaceholder.typicode.com/users', user);
export const addUserThunk = (user: any) => (dispatch: any) => addUser(user).pipe(map((u: any) => dispatch(addUserFulfilled(u))));

// fetching
// ==============================

export const FETCH_USERS: string = 'FETCH_USERS';
export const fetchUsersFulfilled = (users: any[]) => ({ type: FETCH_USERS, users });
export const fetchUsers = (): Observable<any> => HTTPProxyService.get('https://jsonplaceholder.typicode.com/users');
export const fetchUsersThunk = () => (dispatch: any) => fetchUsers().pipe(map((users: any[]) => dispatch(fetchUsersFulfilled(users))));

// deleting
// ==============================

export const DELETE_USER = 'DELETE_USER';
export const deleteUserFulfilled = (user: any) => ({ type: DELETE_USER, user });
export const deleteUser = (user: any): Observable<any> => HTTPProxyService.delete('https://jsonplaceholder.typicode.com/users/1');
export const deleteUserThunk = (user: any) => (dispatch: any) => deleteUser(user).pipe(map((u: any) => dispatch(deleteUserFulfilled(u))));

// updating
// ==============================
export const UPDATE_USER = 'UPDATE_USER';
export const updateUserFulfilled = (user: any) => ({ type: UPDATE_USER, user });
export const updateUser = (user: any): Observable<any> => HTTPProxyService.put('https://jsonplaceholder.typicode.com/users/1', user);
export const updateUserThunk = (user: any) => (dispatch: any) => updateUser(user).pipe(map((u: any) => dispatch(updateUserFulfilled(u))));
