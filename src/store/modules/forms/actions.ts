import { action } from 'typesafe-actions';
import { Action } from 'redux';
import { FormsTypes, Form } from './types';

// Add Form
export const addFormRequest = (data: Form): Action =>
  action(FormsTypes.ADD_FORM_REQUEST, { data });

export const addFormSuccess = (successMsg: string): Action =>
  action(FormsTypes.ADD_FORM_SUCCESS, { successMsg });

export const addFormFailure = (errorMsg: string): Action =>
  action(FormsTypes.ADD_FORM_FAILURE, { errorMsg });

// Get Forms
export const getFormsRequest = (): Action =>
  action(FormsTypes.GET_FORMS_REQUEST);

export const getFormsSuccess = (data: Form[]): Action =>
  action(FormsTypes.GET_FORMS_SUCCESS, { data });

export const getFormsFailure = (errorMsg: string): Action =>
  action(FormsTypes.GET_FORMS_FAILURE, { errorMsg });

// Get Form
export const getFormRequest = (id: number): Action =>
  action(FormsTypes.GET_FORM_REQUEST, { id });

export const getFormSuccess = (data: Form): Action =>
  action(FormsTypes.GET_FORM_SUCCESS, { data });

export const getFormFailure = (errorMsg: string): Action =>
  action(FormsTypes.GET_FORM_FAILURE, { errorMsg });

// Delete Form
export const deleteFormRequest = (id: number): Action =>
  action(FormsTypes.DELETE_FORM_REQUEST, { id });

export const deleteFormSuccess = (successMsg: string): Action =>
  action(FormsTypes.DELETE_FORM_SUCCESS, { successMsg });

export const deleteFormFailure = (errorMsg: string): Action =>
  action(FormsTypes.DELETE_FORM_FAILURE, { errorMsg });

export const setErrorFalse = (): Action => action(FormsTypes.SET_ERROR_FALSE);
