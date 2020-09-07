import { Reducer } from 'redux';
import { UsersState, UsersTypes } from './types';

const INITIAL_STATE: UsersState = {
  user: {},
  usersForms: [],
  loading: false,
  success: false,
  error: false,
  modalTitle: undefined,
  modalMsg: undefined,
};

const reducer: Reducer<UsersState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UsersTypes.ADD_USER_REQUEST:
      return { ...state, loading: true, success: false, error: false };

    case UsersTypes.ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        modalTitle: '',
        modalMsg: action.payload.successMsg,
      };

    case UsersTypes.ADD_USER_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        modalTitle: 'Erro',
        modalMsg: action.payload.errorMsg,
      };

    case UsersTypes.GET_USER_REQUEST:
      return { ...state, loading: true, success: false, error: false };

    case UsersTypes.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
        loading: false,
        error: false,
      };

    case UsersTypes.GET_USER_FAILURE:
      return { ...state, loading: false, success: false, error: true };

    case UsersTypes.UPDATE_USER_REQUEST:
      return { ...state, loading: true, success: false, error: false };

    case UsersTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        modalTitle: '',
        modalMsg: action.payload.successMsg,
      };

    case UsersTypes.UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        modalTitle: 'Erro',
        modalMsg: action.payload.errorMsg,
      };

    case UsersTypes.DELETE_USER_REQUEST:
      return { ...state, loading: true, success: false, error: false };

    case UsersTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        modalTitle: '',
        modalMsg: action.payload.successMsg,
      };

    case UsersTypes.DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        modalTitle: 'Erro',
        modalMsg: action.payload.errorMsg,
      };

    case UsersTypes.GET_USERS_FORMS_REQUEST:
      return { ...state, loading: true, success: false, error: false };

    case UsersTypes.GET_USERS_FORMS_SUCCESS:
      return {
        ...state,
        usersForms: action.payload.data,
        loading: false,
        error: false,
      };

    case UsersTypes.GET_USERS_FORMS_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        modalTitle: 'Erro',
        modalMsg: action.payload.errorMsg,
      };

    case UsersTypes.SET_ERROR_FALSE:
      return {
        ...state,
        error: false,
        success: false,
      };

    default:
      return state;
  }
};

export default reducer;
