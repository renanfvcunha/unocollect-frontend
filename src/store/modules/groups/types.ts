/**
 * Action Types
 */

export enum GroupsTypes {
  GET_GROUPS_REQUEST = '@groups/GET_GROUPS_REQUEST',
  GET_GROUPS_SUCCESS = '@groups/GET_GROUPS_SUCCESS',
  GET_GROUPS_FAILURE = '@groups/GET_GROUPS_FAILURE',
  ADD_GROUP_REQUEST = '@groups/ADD_GROUP_REQUEST',
  ADD_GROUP_SUCCESS = '@groups/ADD_GROUP_SUCCESS',
  ADD_GROUP_FAILURE = '@groups/ADD_GROUP_FAILURE',
  UPDATE_GROUP_REQUEST = '@groups/UPDATE_GROUP_REQUEST',
  UPDATE_GROUP_SUCCESS = '@groups/UPDATE_GROUP_SUCCESS',
  UPDATE_GROUP_FAILURE = '@groups/UPDATE_GROUP_FAILURE',
  DELETE_GROUP_REQUEST = '@groups/DELETE_GROUP_REQUEST',
  DELETE_GROUP_SUCCESS = '@groups/DELETE_GROUP_SUCCESS',
  DELETE_GROUP_FAILURE = '@groups/DELETE_GROUP_FAILURE',
  SET_ERROR_FALSE = '@groups/SET_ERROR_FALSE',
}

/**
 * Data Types
 */

export interface Group {
  id: number;
  name: string;
}

/**
 * State Type
 */
export interface GroupsState {
  readonly groups: Group[];
  readonly loading: boolean;
  readonly success: boolean;
  readonly error: boolean;
  readonly modalTitle?: string;
  readonly modalMsg?: string;
}
