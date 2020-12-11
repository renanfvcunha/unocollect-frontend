import { action } from 'typesafe-actions';
import { Action } from 'redux';

import { AuthTypes, User } from './types';

// Login
export const loginRequest = (username: string, password: string): Action =>
  action(AuthTypes.LOGIN_REQUEST, { username, password });

export const loginSuccess = (token: string, user: User): Action =>
  action(AuthTypes.LOGIN_SUCCESS, { token, user });

export const loginFailure = (errorMsg: string): Action =>
  action(AuthTypes.LOGIN_FAILURE, { errorMsg });

// Check User Token
export const checkTokenRequest = (): Action =>
  action(AuthTypes.CHECK_TOKEN_REQUEST);

export const checkTokenSuccess = (): Action =>
  action(AuthTypes.CHECK_TOKEN_SUCCESS);

export const checkTokenFailure = (errorMsg: string): Action =>
  action(AuthTypes.CHECK_TOKEN_FAILURE, { errorMsg });

// Check Has User
export const checkHasUserRequest = (): Action =>
  action(AuthTypes.CHECK_HAS_USER_REQUEST);

export const checkHasUserSuccess = (): Action =>
  action(AuthTypes.CHECK_HAS_USER_SUCCESS);

export const checkHasUserFailure = (): Action =>
  action(AuthTypes.CHECK_HAS_USER_FAILURE);

// Add First User
export const addFisrtUserRequest = (
  name: string,
  username: string,
  password: string,
  passwordConf: string,
): Action =>
  action(AuthTypes.ADD_FIRST_USER_REQUEST, {
    name,
    username,
    password,
    passwordConf,
  });

export const addFisrtUserSuccess = (token: string, user: User): Action =>
  action(AuthTypes.ADD_FIRST_USER_SUCCESS, { token, user });

export const addFisrtUserFailure = (errorMsg: string): Action =>
  action(AuthTypes.ADD_FIRST_USER_FAILURE, { errorMsg });

// Logout
export const logout = (): Action => action(AuthTypes.LOGOUT);

export const setErrorFalse = (): Action => action(AuthTypes.SET_ERROR_FALSE);
