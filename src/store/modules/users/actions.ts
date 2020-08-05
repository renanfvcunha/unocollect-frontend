import { action } from 'typesafe-actions';
import { UsersTypes, User } from './types';

export const getUsersRequest = () =>
  action(UsersTypes.GET_USERS_REQUEST);

export const getUsersSuccess = (data: User[]) =>
  action (UsersTypes.GET_USERS_SUCCESS, { data });

export const getUsersFailure = () =>
  action(UsersTypes.GET_USERS_FAILURE);
