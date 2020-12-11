/**
 * Action Types
 */

export enum AuthTypes {
  LOGIN_REQUEST = '@auth/LOGIN_REQUEST',
  LOGIN_SUCCESS = '@auth/LOGIN_SUCCESS',
  LOGIN_FAILURE = '@auth/LOGIN_FAILURE',
  CHECK_TOKEN_REQUEST = '@auth/CHECK_TOKEN_REQUEST',
  CHECK_TOKEN_SUCCESS = '@auth/CHECK_TOKEN_SUCCESS',
  CHECK_TOKEN_FAILURE = '@auth/CHECK_TOKEN_FAILURE',
  CHECK_HAS_USER_REQUEST = '@auth/CHECK_HAS_USER_REQUEST',
  CHECK_HAS_USER_SUCCESS = '@auth/CHECK_HAS_USER_SUCCESS',
  CHECK_HAS_USER_FAILURE = '@auth/CHECK_HAS_USER_FAILURE',
  ADD_FIRST_USER_REQUEST = '@auth/ADD_NEW_USER_REQUEST',
  ADD_FIRST_USER_SUCCESS = '@auth/ADD_NEW_USER_SUCCESS',
  ADD_FIRST_USER_FAILURE = '@auth/ADD_NEW_USER_FAILURE',
  SET_ERROR_FALSE = '@auth/SET_ERROR_FALSE',
  LOGOUT = '@auth/LOGOUT',
}

/**
 * Data Types
 */

export interface Auth {
  username: string;
  password: string;
}

export interface User {
  id?: number;
  name?: string;
  admin?: boolean;
}

export interface AuthState {
  readonly user: User;
  readonly token: string;
  readonly invalidToken: boolean;
  readonly hasUser: boolean;
  readonly logged: boolean;
  readonly loading: boolean;
  readonly error: boolean;
  readonly errorTitle?: string;
  readonly errorMsg?: string;
}
