/**
 * Action Types
 */

export enum UsersTypes {
  ADD_USER_REQUEST = '@users/ADD_USER_REQUEST',
  ADD_USER_SUCCESS = '@users/ADD_USER_SUCCESS',
  ADD_USER_FAILURE = '@users/ADD_USER_FAILURE',
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

/**
 * State Type
 */
export interface UsersState {
  readonly users?: User[];
  readonly user?: User;
  readonly loading: boolean;
  readonly error: boolean;
}
