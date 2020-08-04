import { Reducer } from 'redux';
import { AuthState, AuthTypes } from './types';

const INITIAL_STATE: AuthState = {
  user: {},
  token: '',
  logged: false,
  loading: false,
  error: false,
}

const reducer: Reducer<AuthState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthTypes.LOGIN_REQUEST:
      return { ...state, loading: true }

    case AuthTypes.LOGIN_SUCCESS:
      return {
        loading: false,
        error: false,
        logged: true,
        user: action.payload.user,
        token: action.payload.token,
      }

    case AuthTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        logged: false,
      };
    
    case AuthTypes.LOGOUT:
      return {
        ...state,
        token: '',
        user: {},
        logged: false,
      }
  
    default:
      return state;
  }
}

export default reducer;
