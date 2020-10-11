import { Reducer } from 'redux';
import { GroupsState, GroupsTypes } from './types';

const INITIAL_STATE: GroupsState = {
  groups: [],
  loading: false,
  success: false,
  error: false,
  modalMsg: undefined,
  modalTitle: undefined,
};

const reducer: Reducer<GroupsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GroupsTypes.GET_GROUPS_REQUEST:
      return { ...state, loading: true, success: false, error: false };

    case GroupsTypes.GET_GROUPS_SUCCESS:
      return {
        ...state,
        groups: action.payload.data,
        loading: false,
        error: false,
      };

    case GroupsTypes.GET_GROUPS_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        modalTitle: 'Erro',
        modalMsg: action.payload.errorMsg,
      };

    case GroupsTypes.ADD_GROUP_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };

    case GroupsTypes.ADD_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        modalTitle: '',
        modalMsg: action.payload.successMsg,
      };

    case GroupsTypes.ADD_GROUP_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        modalTitle: 'Erro',
        modalMsg: action.payload.errorMsg,
      };

    case GroupsTypes.UPDATE_GROUP_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };

    case GroupsTypes.UPDATE_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        modalTitle: '',
        modalMsg: action.payload.successMsg,
      };

    case GroupsTypes.UPDATE_GROUP_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        modalTitle: 'Erro',
        modalMsg: action.payload.errorMsg,
      };

    case GroupsTypes.DELETE_GROUP_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };

    case GroupsTypes.DELETE_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        modalTitle: '',
        modalMsg: action.payload.successMsg,
      };

    case GroupsTypes.DELETE_GROUP_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        modalTitle: 'Erro',
        modalMsg: action.payload.errorMsg,
      };

    case GroupsTypes.SET_ERROR_FALSE:
      return {
        ...state,
        error: false,
        success: false,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
