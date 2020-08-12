import { action } from 'typesafe-actions';
import { Action } from 'redux';
import { CategoriesTypes, Category } from './types';

export const getCategoriesRequest = (): Action =>
  action(CategoriesTypes.GET_CATEGORIES_REQUEST);

export const getCategoriesSuccess = (data: Category): Action =>
  action(CategoriesTypes.GET_CATEGORIES_SUCCESS, { data });

export const getCategoriesFailure = (errorMsg: string): Action =>
  action(CategoriesTypes.GET_CATEGORIES_FAILURE, { errorMsg });
