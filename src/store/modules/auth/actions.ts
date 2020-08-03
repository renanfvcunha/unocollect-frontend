import { action } from 'typesafe-actions';
import { AuthTypes, Auth, User } from './types';

export const loginRequest = (username: string, password: string) =>
  action(AuthTypes.LOGIN_REQUEST, {username, password});

export const loginSuccess = (token: string, user: User) =>
  action(AuthTypes.LOGIN_SUCCESS, { token, user });

export const loginFailure = (msg: string) =>
  action(AuthTypes.LOGIN_FAILURE, { msg });
