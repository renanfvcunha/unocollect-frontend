/**
 * Action Types
 */

export enum UsersTypes {
  ADD_USER_REQUEST = '@users/ADD_USER_REQUEST',
  ADD_USER_SUCCESS = '@users/ADD_USER_SUCCESS',
  ADD_USER_FAILURE = '@users/ADD_USER_FAILURE',
  GET_USERS_FORMS_REQUEST = '@users/GET_USERS_FORMS_REQUEST',
  GET_USERS_FORMS_SUCCESS = '@users/GET_USERS_FORMS_SUCCESS',
  GET_USERS_FORMS_FAILURE = '@users/GET_USERS_FORMS_FAILURE',
}

/**
 * Data Types
 */

export interface User {
  id?: number;
  registration?: number;
  name?: string;
  username?: string;
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
  readonly error: boolean;
}
