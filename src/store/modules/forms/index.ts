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
      return { ...state, loading: true, success: false, error: false };

    case FormsTypes.ADD_FORM_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        modalTitle: '',
        modalMsg: action.payload.successMsg,
      };

    case FormsTypes.ADD_FORM_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        modalTitle: 'Erro',
        modalMsg: action.payload.errorMsg,
      };

    case FormsTypes.GET_FORMS_REQUEST:
      return { ...state, loading: true, success: false, error: false };

    case FormsTypes.GET_FORMS_SUCCESS:
      return {
        ...state,
        forms: action.payload.data,
        loading: false,
        error: false,
      };

    case FormsTypes.GET_FORMS_FAILURE:
      return {
        ...state,
        forms: action.payload.data,
        loading: false,
        success: false,
        error: true,
        modalTitle: 'Erro',
        modalMsg: action.payload.errorMsg,
      };

    case FormsTypes.GET_FORM_REQUEST:
      return { ...state, loading: true, success: false, error: false };

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
        success: false,
        error: true,
      };

    case FormsTypes.UPDATE_FORM_REQUEST:
      return { ...state, loading: true, success: false, error: false };

    case FormsTypes.UPDATE_FORM_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        modalTitle: '',
        modalMsg: action.payload.successMsg,
      };

    case FormsTypes.UPDATE_FORM_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        modalTitle: 'Erro',
        modalMsg: action.payload.errorMsg,
      };

    case FormsTypes.ALTER_FORM_STATUS_REQUEST:
      return { ...state, loading: true, success: false, error: false };

    case FormsTypes.ALTER_FORM_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        modalTitle: '',
        modalMsg: action.payload.successMsg,
      };

    case FormsTypes.ALTER_FORM_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        modalTitle: 'Erro',
        modalMsg: action.payload.errorMsg,
      };

    case FormsTypes.DELETE_FORM_REQUEST:
      return { ...state, loading: true, success: false, error: false };

    case FormsTypes.DELETE_FORM_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        modalTitle: '',
        modalMsg: action.payload.successMsg,
      };

    case FormsTypes.DELETE_FORM_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        modalTitle: 'Erro',
        modalMsg: action.payload.errorMsg,
      };

    case FormsTypes.SET_ERROR_FALSE:
      return {
        ...state,
        loading: false,
        success: false,
        error: false,
      };

    default:
      return state;
  }
};

export default reducer;
