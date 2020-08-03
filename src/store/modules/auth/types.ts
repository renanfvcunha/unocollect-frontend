/**
 * Action Types
 */

export enum AuthTypes {
  LOGIN_REQUEST = '@auth/LOGIN_REQUEST',
  LOGIN_SUCCESS = '@auth/LOGIN_SUCCESS',
  LOGIN_FAILURE = '@auth/LOGIN_FAILURE',
}

/**
 * Data Types
 */

export interface Auth {
  username: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  admin: boolean;
}

export interface AuthState {
  readonly token: string;
  readonly logged: boolean;
  readonly loading: boolean;
  readonly error: boolean;
}
