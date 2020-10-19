import { Reducer } from 'redux';
import { CategoriesState, CategoriesTypes } from './types';

const INITIAL_STATE: CategoriesState = {
  categories: [],
  loading: false,
  success: false,
  error: false,
  modalMsg: undefined,
  modalTitle: undefined,
};

const reducer: Reducer<CategoriesState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CategoriesTypes.GET_CATEGORIES_REQUEST:
      return { ...state, loading: true, success: false, error: false };

    case CategoriesTypes.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload.data,
        loading: false,
        error: false,
      };

    case CategoriesTypes.GET_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        modalTitle: 'Erro',
        modalMsg: action.payload.errorMsg,
      };

    case CategoriesTypes.ADD_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };

    case CategoriesTypes.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        modalTitle: '',
        modalMsg: action.payload.successMsg,
      };

    case CategoriesTypes.ADD_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        modalTitle: 'Erro',
        modalMsg: action.payload.errorMsg,
      };

    case CategoriesTypes.UPDATE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };

    case CategoriesTypes.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        modalTitle: '',
        modalMsg: action.payload.successMsg,
      };

    case CategoriesTypes.UPDATE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        modalTitle: 'Erro',
        modalMsg: action.payload.errorMsg,
      };

    case CategoriesTypes.DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };

    case CategoriesTypes.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        modalTitle: '',
        modalMsg: action.payload.successMsg,
      };

    case CategoriesTypes.DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        modalTitle: 'Erro',
        modalMsg: action.payload.errorMsg,
      };

    case CategoriesTypes.SET_ERROR_FALSE:
      return {
        ...state,
        error: false,
        success: false,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
