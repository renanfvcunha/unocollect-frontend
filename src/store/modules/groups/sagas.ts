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
} from './actions';

interface Msg {
  msg: string;
}

export function* getGroups(): SagaIterator {
  try {
    const response: AxiosResponse<Group> = yield call(api.get, 'groups');

    yield put(getGroupsSuccess(response.data));
  } catch (err) {
    yield put(getGroupsFailure(err.response.data.msg));
  }
}

export function* addGroup({ payload }: AnyAction): SagaIterator {
  try {
    const response: AxiosResponse<Msg> = yield call(
      api.post,
      'groups',
      payload,
    );

    yield put(addGroupSuccess(response.data.msg));
  } catch (err) {
    yield put(addGroupFailure(err.response.data.msg));
  }
}

export default all([
  takeLatest(GroupsTypes.GET_GROUPS_REQUEST, getGroups),
  takeLatest(GroupsTypes.ADD_GROUP_REQUEST, addGroup),
]);
