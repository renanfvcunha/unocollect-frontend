/**
 * Action Types
 */

export enum CategoriesTypes {
  GET_CATEGORIES_REQUEST = '@categories/GET_CATEGORIES_REQUEST',
  GET_CATEGORIES_SUCCESS = '@categories/GET_CATEGORIES_SUCCESS',
  GET_CATEGORIES_FAILURE = '@categories/GET_CATEGORIES_FAILURE',
  ADD_CATEGORY_REQUEST = '@categories/ADD_CATEGORY_REQUEST',
  ADD_CATEGORY_SUCCESS = '@categories/ADD_CATEGORY_SUCCESS',
  ADD_CATEGORY_FAILURE = '@categories/ADD_CATEGORY_FAILURE',
  UPDATE_CATEGORY_REQUEST = '@categories/UPDATE_CATEGORY_REQUEST',
  UPDATE_CATEGORY_SUCCESS = '@categories/UPDATE_CATEGORY_SUCCESS',
  UPDATE_CATEGORY_FAILURE = '@categories/UPDATE_CATEGORY_FAILURE',
  DELETE_CATEGORY_REQUEST = '@categories/DELETE_CATEGORY_REQUEST',
  DELETE_CATEGORY_SUCCESS = '@categories/DELETE_CATEGORY_SUCCESS',
  DELETE_CATEGORY_FAILURE = '@categories/DELETE_CATEGORY_FAILURE',
  SET_ERROR_FALSE = '@categories/SET_ERROR_FALSE',
}

/**
 * Data Types
 */

export interface Category {
  id: number | null;
  name?: string;
}

/**
 * State Type
 */
export interface CategoriesState {
  readonly categories: Category[];
  readonly loading: boolean;
  readonly success: boolean;
  readonly error: boolean;
  readonly modalTitle?: string;
  readonly modalMsg?: string;
}
