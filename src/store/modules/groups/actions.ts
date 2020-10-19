import { action } from 'typesafe-actions';
import { Action } from 'redux';
import { GroupsTypes, Group } from './types';

// Get Groups
export const getGroupsRequest = (): Action =>
  action(GroupsTypes.GET_GROUPS_REQUEST);

export const getGroupsSuccess = (data: Group): Action =>
  action(GroupsTypes.GET_GROUPS_SUCCESS, { data });

export const getGroupsFailure = (errorMsg: string): Action =>
  action(GroupsTypes.GET_GROUPS_FAILURE, { errorMsg });

// Add Group
export const addGroupRequest = (name: string): Action =>
  action(GroupsTypes.ADD_GROUP_REQUEST, { name });

export const addGroupSuccess = (successMsg: string): Action =>
  action(GroupsTypes.ADD_GROUP_SUCCESS, { successMsg });

export const addGroupFailure = (errorMsg: string): Action =>
  action(GroupsTypes.ADD_GROUP_FAILURE, { errorMsg });

// Update Group
export const updateGroupRequest = (id: number, name: string): Action =>
  action(GroupsTypes.UPDATE_GROUP_REQUEST, { id, name });

export const updateGroupSuccess = (successMsg: string): Action =>
  action(GroupsTypes.UPDATE_GROUP_SUCCESS, { successMsg });

export const updateGroupFailure = (errorMsg: string): Action =>
  action(GroupsTypes.UPDATE_GROUP_FAILURE, { errorMsg });

// Delete Group
export const deleteGroupRequest = (id: number): Action =>
  action(GroupsTypes.DELETE_GROUP_REQUEST, { id });

export const deleteGroupSuccess = (successMsg: string): Action =>
  action(GroupsTypes.DELETE_GROUP_SUCCESS, { successMsg });

export const deleteGroupFailure = (errorMsg: string): Action =>
  action(GroupsTypes.DELETE_GROUP_FAILURE, { errorMsg });

export const setErrorFalse = (): Action => action(GroupsTypes.SET_ERROR_FALSE);
