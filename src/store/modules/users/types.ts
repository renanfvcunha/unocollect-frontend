/**
 * Action Types
 */

export enum UsersTypes {
  ADD_USER_REQUEST = '@users/ADD_USER_REQUEST',
  ADD_USER_SUCCESS = '@users/ADD_USER_SUCCESS',
  ADD_USER_FAILURE = '@users/ADD_USER_FAILURE',
  GET_USER_REQUEST = '@users/GET_USER_REQUEST',
  GET_USER_SUCCESS = '@users/GET_USER_SUCCESS',
  GET_USER_FAILURE = '@users/GET_USER_FAILURE',
  UPDATE_USER_REQUEST = '@users/UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS = '@users/UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILURE = '@users/UPDATE_USER_FAILURE',
  DELETE_USER_REQUEST = '@users/DELETE_USER_REQUEST',
  DELETE_USER_SUCCESS = '@users/DELETE_USER_SUCCESS',
  DELETE_USER_FAILURE = '@users/DELETE_USER_FAILURE',
  GET_USERS_FORMS_REQUEST = '@users/GET_USERS_FORMS_REQUEST',
  GET_USERS_FORMS_SUCCESS = '@users/GET_USERS_FORMS_SUCCESS',
  GET_USERS_FORMS_FAILURE = '@users/GET_USERS_FORMS_FAILURE',
  SET_ERROR_FALSE = '@users/SET_ERROR_FALSE',
}

/**
 * Data Types
 */

export interface User {
  id?: number;
  name?: string;
  username?: string;
  groups?: number[];
  admin?: boolean;
  password?: string;
  passwordConf?: string;
}

export interface UserForm {
  id?: number;
  latitude?: number;
  longitude?: number;
  created_at?: Date;
  created_by?: Date;
}

/**
 * State Type
 */
export interface UsersState {
  readonly usersForms: UserForm[];
  readonly user: User;
  readonly loading: boolean;
  readonly success: boolean;
  readonly error: boolean;
  readonly modalTitle?: string;
  readonly modalMsg?: string;
}
