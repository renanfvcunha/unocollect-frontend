import { Reducer } from 'redux';
import { CategoriesState, CategoriesTypes } from './types';

const INITIAL_STATE: CategoriesState = {
  categories: [],
  loading: false,
  error: false,
};

const reducer: Reducer<CategoriesState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CategoriesTypes.GET_CATEGORIES_REQUEST:
      return { ...state, loading: true, error: false };

    case CategoriesTypes.GET_CATEGORIES_SUCCESS:
      return {
        categories: action.payload.data,
        loading: false,
        error: false,
      };

    case CategoriesTypes.GET_CATEGORIES_FAILURE:
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};

export default reducer;
