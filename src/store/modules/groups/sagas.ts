import { takeLatest, call, put, all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { AnyAction } from 'redux';
import { AxiosResponse } from 'axios';

import api from '../../../services/api';
import { GroupsTypes, Group } from './types';
import {
  getGroupsSuccess,
  getGroupsFailure,
  addGroupSuccess,
  addGroupFailure,
  deleteGroupSuccess,
  deleteGroupFailure,
} from './actions';

interface Msg {
  msg: string;
}

interface IGroup extends AnyAction {
  payload: {
    id?: number;
    name?: string;
  };
}

export function* getGroups(): SagaIterator {
  try {
    const response: AxiosResponse<Group> = yield call(api.get, 'groups');

    yield put(getGroupsSuccess(response.data));
  } catch (err) {
    yield put(getGroupsFailure(err.response.data.msg));
  }
}

export function* addGroup({ payload }: IGroup): SagaIterator {
  try {
    const response: AxiosResponse<Msg> = yield call(api.post, 'groups', {
      name: payload.name,
    });

    yield put(addGroupSuccess(response.data.msg));
  } catch (err) {
    yield put(addGroupFailure(err.response.data.msg));
  }
}

export function* deleteGroup({ payload }: IGroup): SagaIterator {
  try {
    const response: AxiosResponse<Msg> = yield call(
      api.delete,
      `groups/${payload.id}`,
    );

    yield put(deleteGroupSuccess(response.data.msg));
  } catch (err) {
    yield put(deleteGroupFailure(err.response.data.msg));
  }
}

export default all([
  takeLatest(GroupsTypes.GET_GROUPS_REQUEST, getGroups),
  takeLatest(GroupsTypes.ADD_GROUP_REQUEST, addGroup),
  takeLatest(GroupsTypes.DELETE_GROUP_REQUEST, deleteGroup),
]);
