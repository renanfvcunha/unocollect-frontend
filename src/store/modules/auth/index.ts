import { Reducer } from 'redux';
import { AuthState, AuthTypes } from './types';

const INITIAL_STATE: AuthState = {
  user: {},
  token: undefined,
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
