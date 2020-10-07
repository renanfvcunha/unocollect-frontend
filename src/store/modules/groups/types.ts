/**
 * Action Types
 */

export enum GroupsTypes {
  GET_GROUPS_REQUEST = '@categories/GET_GROUPS_REQUEST',
  GET_GROUPS_SUCCESS = '@categories/GET_GROUPS_SUCCESS',
  GET_GROUPS_FAILURE = '@categories/GET_GROUPS_FAILURE',
  ADD_GROUP_REQUEST = '@categories/ADD_GROUP_REQUEST',
  ADD_GROUP_SUCCESS = '@categories/ADD_GROUP_SUCCESS',
  ADD_GROUP_FAILURE = '@categories/ADD_GROUP_FAILURE',
  SET_ERROR_FALSE = '@categories/SET_ERROR_FALSE',
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
