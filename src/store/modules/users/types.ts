/**
 * Action Types
 */

export enum UsersTypes {
  GET_USERS_REQUEST = '@users/GET_USERS_REQUEST',
  GET_USERS_SUCCESS = '@users/GET_USERS_SUCCESS',
  GET_USERS_FAILURE = '@users/GET_USERS_FAILURE',
}

/**
 * Data Types
 */

export interface User {
  id: number;
  registration: number;
  name: string;
  username: string;
  admin: boolean;
}

/**
 * State Type
 */
export interface UsersState {
  readonly users?: User[];
  readonly loading: boolean;
  readonly error: boolean;
}
