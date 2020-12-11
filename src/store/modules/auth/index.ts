import { Reducer } from 'redux';
import { AuthState, AuthTypes } from './types';

const INITIAL_STATE: AuthState = {
  user: {},
  token: '',
  invalidToken: false,
  hasUser: true,
  logged: false,
  loading: false,
  error: false,
  errorTitle: 'Erro',
  errorMsg: undefined,
};

const reducer: Reducer<AuthState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthTypes.LOGIN_REQUEST:
      return { ...state, loading: true };

    case AuthTypes.LOGIN_SUCCESS:
      return {
        loading: false,
        error: false,
        logged: true,
        user: action.payload.user,
        token: action.payload.token,
        invalidToken: false,
        hasUser: true,
        errorTitle: undefined,
        errorMsg: undefined,
      };

    case AuthTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorTitle: 'Erro',
        errorMsg: action.payload.errorMsg,
      };

    case AuthTypes.CHECK_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case AuthTypes.CHECK_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };

    case AuthTypes.CHECK_TOKEN_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        invalidToken: true,
        errorTitle: 'Aviso',
        errorMsg: action.payload.errorMsg,
      };

    case AuthTypes.CHECK_HAS_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case AuthTypes.CHECK_HAS_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        hasUser: true,
      };

    case AuthTypes.CHECK_HAS_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: false,
        hasUser: false,
      };

    case AuthTypes.ADD_FIRST_USER_REQUEST:
      return { ...state, loading: true };

    case AuthTypes.ADD_FIRST_USER_SUCCESS:
      return {
        loading: false,
        error: false,
        logged: true,
        user: action.payload.user,
        token: action.payload.token,
        invalidToken: false,
        hasUser: true,
        errorTitle: undefined,
        errorMsg: undefined,
      };

    case AuthTypes.ADD_FIRST_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        hasUser: false,
        errorTitle: 'Erro',
        errorMsg: action.payload.errorMsg,
      };

    case AuthTypes.SET_ERROR_FALSE:
      return {
        ...state,
        error: false,
      };

    case AuthTypes.LOGOUT:
      return {
        ...state,
        token: '',
        user: {},
        logged: false,
      };

    default:
      return state;
  }
};

export default reducer;
