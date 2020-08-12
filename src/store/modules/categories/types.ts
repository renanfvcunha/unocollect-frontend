/**
 * Action Types
 */

export enum CategoriesTypes {
  GET_CATEGORIES_REQUEST = '@forms/GET_CATEGORIES_REQUEST',
  GET_CATEGORIES_SUCCESS = '@forms/GET_CATEGORIES_SUCCESS',
  GET_CATEGORIES_FAILURE = '@forms/GET_CATEGORIES_FAILURE',
}

/**
 * Data Types
 */

export interface Category {
  id?: number;
  name?: string;
}

/**
 * State Type
 */
export interface CategoriesState {
  readonly id?: number;
  readonly name?: string;
  readonly categories?: Category[];
  readonly loading?: boolean;
  readonly error?: boolean;
}
