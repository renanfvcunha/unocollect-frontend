import { action } from 'typesafe-actions';
import { Action } from 'redux';

import { FillsTypes, Fill } from './types';
import { Form } from '../forms/types';

// Get Fills
export const getFillsRequest = (): Action =>
  action(FillsTypes.GET_FILLS_REQUEST);

export const getFillsSuccess = (data: Form[]): Action =>
  action(FillsTypes.GET_FILLS_SUCCESS, { data });

export const getFillsFailure = (errorMsg: string): Action =>
  action(FillsTypes.GET_FILLS_FAILURE, { errorMsg });

export const addUserLocation = (latitude: number, longitude: number): Action =>
  action(FillsTypes.ADD_USER_LOCATION, { latitude, longitude });

export const addFillRequest = (data: Fill): Action =>
  action(FillsTypes.ADD_FILL_REQUEST, { data });

export const addFillSuccess = (msg: string): Action =>
  action(FillsTypes.ADD_FILL_SUCCESS, { msg });

export const addFillFailure = (errorMsg: string): Action =>
  action(FillsTypes.GET_FILLS_FAILURE, { errorMsg });
