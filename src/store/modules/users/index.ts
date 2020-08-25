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

    case UsersTypes.GET_USERS_FORMS_REQUEST:
      return { ...state, loading: true, error: false };

    case UsersTypes.GET_USERS_FORMS_SUCCESS:
      return {
        ...state,
        usersForms: action.payload.data,
        loading: false,
        error: false,
      };

    case UsersTypes.GET_USERS_FORMS_FAILURE:
      return { ...state, loading: false, error: true };

    case UsersTypes.SET_ERROR_FALSE:
      return {
        ...state,
        error: false,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
