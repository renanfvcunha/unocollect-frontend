import { action } from 'typesafe-actions';
import { Action } from 'redux';
import { CategoriesTypes, Category } from './types';

// Get Categories
export const getCategoriesRequest = (): Action =>
  action(CategoriesTypes.GET_CATEGORIES_REQUEST);

export const getCategoriesSuccess = (data: Category): Action =>
  action(CategoriesTypes.GET_CATEGORIES_SUCCESS, { data });

export const getCategoriesFailure = (errorMsg: string): Action =>
  action(CategoriesTypes.GET_CATEGORIES_FAILURE, { errorMsg });

// Add Category
export const addCategoryRequest = (name: string): Action =>
  action(CategoriesTypes.ADD_CATEGORY_REQUEST, { name });

export const addCategorySuccess = (successMsg: string): Action =>
  action(CategoriesTypes.ADD_CATEGORY_SUCCESS, { successMsg });

export const addCategoryFailure = (errorMsg: string): Action =>
  action(CategoriesTypes.ADD_CATEGORY_FAILURE, { errorMsg });

// Update Group
export const updateCategoryRequest = (id: number, name: string): Action =>
  action(CategoriesTypes.UPDATE_CATEGORY_REQUEST, { id, name });

export const updateCategorySuccess = (successMsg: string): Action =>
  action(CategoriesTypes.UPDATE_CATEGORY_SUCCESS, { successMsg });

export const updateCategoryFailure = (errorMsg: string): Action =>
  action(CategoriesTypes.UPDATE_CATEGORY_FAILURE, { errorMsg });

// Delete Group
export const deleteCategoryRequest = (id: number): Action =>
  action(CategoriesTypes.DELETE_CATEGORY_REQUEST, { id });

export const deleteCategorySuccess = (successMsg: string): Action =>
  action(CategoriesTypes.DELETE_CATEGORY_SUCCESS, { successMsg });

export const deleteCategoryFailure = (errorMsg: string): Action =>
  action(CategoriesTypes.DELETE_CATEGORY_FAILURE, { errorMsg });

export const setErrorFalse = (): Action =>
  action(CategoriesTypes.SET_ERROR_FALSE);
