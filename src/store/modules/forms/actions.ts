import { action } from 'typesafe-actions';
import { Action } from 'redux';
import { FormsTypes, Form } from './types';

// Add Form
export const addFormRequest = (data: Form): Action =>
  action(FormsTypes.ADD_FORM_REQUEST, { data });

export const addFormSuccess = (successMsg: string): Action =>
  action(FormsTypes.ADD_FORM_SUCCESS, { successMsg });

export const adddFormFailure = (errorMsg: string): Action =>
  action(FormsTypes.ADD_FORM_FAILURE, { errorMsg });

// Get Form
export const getFormRequest = (id: number): Action =>
  action(FormsTypes.GET_FORM_REQUEST, { id });

export const getFormSuccess = (data: Form): Action =>
  action(FormsTypes.GET_FORM_SUCCESS, { data });

export const getFormFailure = (errorMsg: string): Action =>
  action(FormsTypes.GET_FORM_FAILURE, { errorMsg });
