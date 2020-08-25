import { action } from 'typesafe-actions';
import { Action } from 'redux';
import { UsersTypes, User, UserForm } from './types';

// Add User
export const addUserRequest = (data: User): Action =>
  action(UsersTypes.ADD_USER_REQUEST, { data });

export const addUserSuccess = (successMsg: string): Action =>
  action(UsersTypes.ADD_USER_SUCCESS, { successMsg });

export const addUserFailure = (errorMsg: string): Action =>
  action(UsersTypes.ADD_USER_FAILURE, { errorMsg });

// Get Users
export const getUsersFormsRequest = (id: number): Action =>
  action(UsersTypes.GET_USERS_FORMS_REQUEST, { id });

export const getUsersFormsSuccess = (data: UserForm): Action =>
  action(UsersTypes.GET_USERS_FORMS_SUCCESS, { data });

export const getUsersFormsFailure = (errorMsg: string): Action =>
  action(UsersTypes.GET_USERS_FORMS_SUCCESS, { errorMsg });

export const setErrorFalse = (): Action => action(UsersTypes.SET_ERROR_FALSE);
