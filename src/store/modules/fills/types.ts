import { Form } from '../forms/types';

/**
 * Action Types
 */

export enum FillsTypes {
  GET_FILLS_REQUEST = '@fills/GET_FILLS_REQUEST',
  GET_FILLS_SUCCESS = '@fills/GET_FILLS_SUCCESS',
  GET_FILLS_FAILURE = '@fills/GET_FILLS_FAILURE',
  ADD_USER_LOCATION = '@fills/ADD_USER_LOCATION',
  ADD_FILL_REQUEST = '@fills/ADD_FILL_REQUEST',
  ADD_FILL_SUCCESS = '@fills/ADD_FILL_SUCCESS',
  ADD_FILL_FAILURE = '@fills/ADD_FILL_FAILURE',
}

/**
 * Data Types
 */

export interface Fill {
  latitude?: number;
  longitude?: number;
  values?: Value[];
}

export interface Value {
  fieldId?: number;
  value: string;
}

/**
 * State Type
 */
export interface FillsState {
  readonly fill: Fill;
  readonly forms?: Form[];
}
