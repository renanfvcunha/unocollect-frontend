import { Reducer } from 'redux';
import { ImagesState, ImagesTypes } from './types';

const INITIAL_STATE: ImagesState = {
  usersImages: [],
  loading: false,
  success: false,
  error: false,
};

const reducer: Reducer<ImagesState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ImagesTypes.GET_USERS_IMAGES_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };

    case ImagesTypes.GET_USERS_IMAGES_SUCCESS:
      return {
        ...state,
        usersImages: action.payload.data,
        loading: false,
        success: true,
        error: false,
      };

    case ImagesTypes.GET_USERS_IMAGES_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
      };

    default:
      return state;
  }
};

export default reducer;
