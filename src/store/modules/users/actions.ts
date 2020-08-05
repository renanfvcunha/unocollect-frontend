import { action } from 'typesafe-actions';
import { Action } from 'redux';
import { UsersTypes, User } from './types';

export const addUserRequest = (data: User): Action =>
  action(UsersTypes.ADD_USER_REQUEST, { data });

export const addUserSuccess = (successMsg: string): Action =>
  action(UsersTypes.ADD_USER_SUCCESS, { successMsg });

export const adddUserFailure = (errorMsg: string): Action =>
  action(UsersTypes.ADD_USER_FAILURE, { errorMsg });
