import { Reducer } from 'redux';
import { FormsState, FormsTypes } from './types';

const INITIAL_STATE: FormsState = {
  title: '',
  description: '',
  category: 0,
  fields: [],
  loading: false,
  error: false,
};

const reducer: Reducer<FormsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FormsTypes.ADD_FORM_REQUEST:
      return { ...state, loading: true, error: false };

    case FormsTypes.ADD_FORM_SUCCESS:
      return { ...state, loading: false, error: false };

    case FormsTypes.ADD_FORM_FAILURE:
      return { ...state, loading: false, error: true };

    case FormsTypes.GET_FORM_REQUEST:
      return { ...state, loading: true, error: false };

    case FormsTypes.GET_FORM_SUCCESS:
      return {
        ...state,
        title: action.payload.data.title,
        description: action.payload.data.description,
        fields: action.payload.data.fields,
        loading: false,
        error: false,
      };

    case FormsTypes.GET_FORM_FAILURE:
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
