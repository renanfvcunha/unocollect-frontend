/**
 * Action Types
 */

export enum ImagesTypes {
  GET_USERS_IMAGES_REQUEST = '@images/GET_USERS_IMAGES_REQUEST',
  GET_USERS_IMAGES_SUCCESS = '@images/GET_USERS_IMAGES_SUCCESS',
  GET_USERS_IMAGES_FAILURE = '@images/GET_USERS_IMAGES_FAILURE',
}

/**
 * Data Types
 */

export interface UserImage {
  id_user_form: number;
  name: string;
  images: string[];
}

/**
 * State Type
 */
export interface ImagesState {
  usersImages: UserImage[];
  readonly loading: boolean;
  readonly success: boolean;
  readonly error: boolean;
}
