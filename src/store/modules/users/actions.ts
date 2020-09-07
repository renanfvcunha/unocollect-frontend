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

// Get User
export const getUserRequest = (id: number): Action =>
  action(UsersTypes.GET_USER_REQUEST, { id });

export const getUserSuccess = (data: User): Action =>
  action(UsersTypes.GET_USER_SUCCESS, { data });

export const getUserFailure = (errorMsg: string): Action =>
  action(UsersTypes.GET_USER_FAILURE, { errorMsg });

// Update User
export const updateUserRequest = (id: number, data: User): Action =>
  action(UsersTypes.UPDATE_USER_REQUEST, { id, data });

export const updateUserSuccess = (successMsg: string): Action =>
  action(UsersTypes.UPDATE_USER_SUCCESS, { successMsg });

export const updateUserFailure = (errorMsg: string): Action =>
  action(UsersTypes.UPDATE_USER_FAILURE, { errorMsg });

// Delete User
export const deleteUserRequest = (id: number): Action =>
  action(UsersTypes.DELETE_USER_REQUEST, { id });

export const deleteUserSuccess = (successMsg: string): Action =>
  action(UsersTypes.DELETE_USER_SUCCESS, { successMsg });

export const deleteUserFailure = (errorMsg: string): Action =>
  action(UsersTypes.DELETE_USER_FAILURE, { errorMsg });

// Get Users
export const getUsersFormsRequest = (id: number): Action =>
  action(UsersTypes.GET_USERS_FORMS_REQUEST, { id });

export const getUsersFormsSuccess = (data: UserForm): Action =>
  action(UsersTypes.GET_USERS_FORMS_SUCCESS, { data });

export const getUsersFormsFailure = (errorMsg: string): Action =>
  action(UsersTypes.GET_USERS_FORMS_FAILURE, { errorMsg });

export const setErrorFalse = (): Action => action(UsersTypes.SET_ERROR_FALSE);
