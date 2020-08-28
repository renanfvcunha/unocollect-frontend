import { action } from 'typesafe-actions';
import { Action } from 'redux';

import { ImagesTypes, UserImage } from './types';

// Get Images
export const getUsersImagesRequest = (id: number): Action =>
  action(ImagesTypes.GET_USERS_IMAGES_REQUEST, { id });

export const getUsersImagesSuccess = (data: UserImage[]): Action =>
  action(ImagesTypes.GET_USERS_IMAGES_SUCCESS, { data });

export const getUsersImagesFailure = (errorMsg: string): Action =>
  action(ImagesTypes.GET_USERS_IMAGES_FAILURE, { errorMsg });
