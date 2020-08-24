import { Reducer } from 'redux';
import { FillsState, FillsTypes, Fill } from './types';

const INITIAL_STATE: FillsState = {
  fill: {},
  forms: [],
};

const reducer: Reducer<FillsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FillsTypes.GET_FILLS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case FillsTypes.GET_FILLS_SUCCESS:
      return {
        ...state,
        forms: action.payload.data,
        loading: false,
        error: false,
      };

    case FillsTypes.GET_FILLS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case FillsTypes.ADD_USER_LOCATION:
      return {
        ...state,
        fill: {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
        },
      };

    case FillsTypes.ADD_FILL_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case FillsTypes.ADD_FILL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };

    case FillsTypes.ADD_FILL_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export default reducer;
