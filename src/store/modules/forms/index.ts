import { Reducer } from 'redux';
import { FormsState, FormsTypes } from './types';

const INITIAL_STATE: FormsState = {
  form: {},
  forms: [],
  loading: false,
  success: false,
  error: false,
  modalTitle: undefined,
  modalMsg: undefined,
};

const reducer: Reducer<FormsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FormsTypes.ADD_FORM_REQUEST:
      return { ...state, loading: true, error: false };

    case FormsTypes.ADD_FORM_SUCCESS:
      return { ...state, loading: false, error: false };

    case FormsTypes.ADD_FORM_FAILURE:
      return { ...state, loading: false, error: true };

    case FormsTypes.GET_FORMS_REQUEST:
      return { ...state, loading: true, error: false };

    case FormsTypes.GET_FORMS_SUCCESS:
      return {
        ...state,
        forms: action.payload.data,
        loading: true,
        error: false,
      };

    case FormsTypes.GET_FORM_REQUEST:
      return { ...state, loading: true, error: false };

    case FormsTypes.GET_FORM_SUCCESS:
      return {
        ...state,
        form: action.payload.data,
        loading: false,
        error: false,
      };

    case FormsTypes.GET_FORM_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case FormsTypes.DELETE_FORM_REQUEST:
      return { ...state, loading: true, success: false, error: false };

    case FormsTypes.DELETE_FORM_SUCCESS:
      return {
        ...state,
        modalTitle: '',
        modalMsg: action.payload.successMsg,
        loading: false,
        success: true,
        error: false,
      };

    case FormsTypes.DELETE_FORM_FAILURE:
      return {
        ...state,
        modalTitle: 'Erro',
        modalMsg: action.payload.errorMsg,
        loading: false,
        success: false,
        error: true,
      };

    case FormsTypes.SET_ERROR_FALSE:
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
