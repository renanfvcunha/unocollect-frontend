import { Reducer } from 'redux';
import { UsersState, UsersTypes } from './types';

const INITIAL_STATE: UsersState = {
  user: {},
  loading: false,
  error: false,
};

const reducer: Reducer<UsersState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UsersTypes.ADD_USER_REQUEST:
      return { ...state, loading: true, error: false };

    case UsersTypes.ADD_USER_SUCCESS:
      return { ...state, loading: false, error: false };

    case UsersTypes.ADD_USER_FAILURE:
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};

export default reducer;
