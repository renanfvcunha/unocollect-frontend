/**
 * Action Types
 */

export enum FillsTypes {
  ADD_USER_LOCATION = '@fills/ADD_USER_LOCATION',
  GET_FORMS_REQUEST = '@fills/GET_FORMS_REQUEST',
  GET_FORMS_SUCCESS = '@fills/GET_FORMS_SUCCESS',
  GET_FORMS_FAILURE = '@fills/GET_FORMS_FAILURE',
  ADD_FILL_REQUEST = '@fills/ADD_FILL_REQUEST',
  ADD_FILL_SUCCESS = '@fills/ADD_FILL_SUCCESS',
  ADD_FILL_FAILURE = '@fills/ADD_FILL_FAILURE',
  SET_SUCCESS_FALSE = '@fills/SET_SUCCESS_FALSE',
}

/**
 * Data Types
 */

export interface Form {
  id?: number;
  title?: string;
  description?: string;
  fields?: Field[];
}

export interface Field {
  id: number;
  name: string;
  description?: string | null;
  type: string;
  options?: string[] | null;
  required: boolean;
}

export interface Fill {
  key?: number;
  latitude?: number;
  longitude?: number;
  formValues?: Value[];
  date?: Date;
  images?: Img[];
}

export interface Value {
  fieldId?: number;
  value: string;
  required?: boolean;
}

export interface Img {
  uri: string;
  name: string;
  type: string;
}

/**
 * State Type
 */
export interface FillsState {
  readonly fill: Fill;
  readonly forms: Form[];
  readonly form: Form;
  readonly loading: boolean;
  readonly success: boolean;
  readonly error: boolean;
}
