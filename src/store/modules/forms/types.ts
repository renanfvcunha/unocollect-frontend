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
}

/**
 * Data Types
 */

export interface Form {
  id?: number;
  title?: string;
  description?: string;
  category?: number | null;
  created_at?: Date;
  fields?: Field[];
}

export interface Field {
  id?: number;
  name?: string;
  description?: string;
  created_at?: Date;
  values?: Value[];
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
}
