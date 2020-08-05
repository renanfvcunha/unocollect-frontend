import { Reducer } from 'redux';
import { UsersState, UsersTypes } from './types';

const INITIAL_STATE: UsersState = {
  users: [],
  loading: false,
  error: false,
}

const reducer: Reducer<UsersState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UsersTypes.GET_USERS_REQUEST:
      return { ...state, loading: true, error: false };
    
    case UsersTypes.GET_USERS_SUCCESS:
      return { users: action.payload.data, loading: false, error: false }

    case UsersTypes.GET_USERS_FAILURE:
      return { ...state, loading: false, error: true }
  
    default:
      return state;
  }
}

export default reducer;
