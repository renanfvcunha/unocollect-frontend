import { Category } from '../categories/types';

/**
 * Action Types
 */

export enum FormsTypes {
  ADD_FORM_REQUEST = '@forms/ADD_FORM_REQUEST',
  ADD_FORM_SUCCESS = '@forms/ADD_FORM_SUCCESS',
  ADD_FORM_FAILURE = '@forms/ADD_FORM_FAILURE',
  GET_FORMS_REQUEST = '@forms/GET_FORMS_REQUEST',
  GET_FORMS_SUCCESS = '@forms/GET_FORMS_SUCCESS',
  GET_FORMS_FAILURE = '@forms/GET_FORMS_FAILURE',
  GET_FORM_REQUEST = '@forms/GET_FORM_REQUEST',
  GET_FORM_SUCCESS = '@forms/GET_FORM_SUCCESS',
  GET_FORM_FAILURE = '@forms/GET_FORM_FAILURE',
  UPDATE_FORM_REQUEST = '@forms/UPDATE_FORM_REQUEST',
  UPDATE_FORM_SUCCESS = '@forms/UPDATE_FORM_SUCCESS',
  UPDATE_FORM_FAILURE = '@forms/UPDATE_FORM_FAILURE',
  ALTER_FORM_STATUS_REQUEST = '@forms/ALTER_FORM_STATUS_REQUEST',
  ALTER_FORM_STATUS_SUCCESS = '@forms/ALTER_FORM_STATUS_SUCCESS',
  ALTER_FORM_STATUS_FAILURE = '@forms/ALTER_FORM_STATUS_FAILURE',
  DELETE_FORM_REQUEST = '@forms/DELETE_FORM_REQUEST',
  DELETE_FORM_SUCCESS = '@forms/DELETE_FORM_SUCCESS',
  DELETE_FORM_FAILURE = '@forms/DELETE_FORM_FAILURE',
  SET_ERROR_FALSE = '@forms/SET_ERROR_FALSE',
}

/**
 * Data Types
 */

export interface Form {
  id?: number;
  title?: string;
  description?: string;
  category?: Category;
  status?: string;
  groups?: number[];
  created_at?: Date;
  fields?: Field[];
  fills?: number;
}

export interface Field {
  id?: number;
  name?: string;
  description?: string;
  type: string;
  options: string[];
  required: boolean;
  values?: Value[];
  created_at?: Date;
}

export interface Value {
  value?: string;
  user?: string;
  created_at?: Date;
}

/**
 * State Type
 */
export interface FormsState {
  readonly form: Form;
  readonly forms: Form[];
  readonly loading: boolean;
  readonly success: boolean;
  readonly error: boolean;
  readonly modalTitle?: string;
  readonly modalMsg?: string;
}
