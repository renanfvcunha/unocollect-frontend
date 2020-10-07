import { action } from 'typesafe-actions';
import { Action } from 'redux';
import { GroupsTypes, Group } from './types';

// Get Categories
export const getGroupsRequest = (): Action =>
  action(GroupsTypes.GET_GROUPS_REQUEST);

export const getGroupsSuccess = (data: Group): Action =>
  action(GroupsTypes.GET_GROUPS_SUCCESS, { data });

export const getGroupsFailure = (errorMsg: string): Action =>
  action(GroupsTypes.GET_GROUPS_FAILURE, { errorMsg });

// Add Category
export const addGroupRequest = (name: string): Action =>
  action(GroupsTypes.ADD_GROUP_REQUEST, { name });

export const addGroupSuccess = (successMsg: string): Action =>
  action(GroupsTypes.ADD_GROUP_SUCCESS, { successMsg });

export const addGroupFailure = (errorMsg: string): Action =>
  action(GroupsTypes.ADD_GROUP_FAILURE, { errorMsg });

export const setErrorFalse = (): Action => action(GroupsTypes.SET_ERROR_FALSE);
