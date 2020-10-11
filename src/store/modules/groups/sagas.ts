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
  updateGroupSuccess,
  updateGroupFailure,
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
    if (err.message === 'Network Error') {
      yield put(
        getGroupsFailure(
          'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.',
        ),
      );
    } else if (err.response) {
      yield put(getGroupsFailure(err.response.data.msg));
    } else {
      yield put(getGroupsFailure(err));
    }
  }
}

export function* addGroup({ payload }: IGroup): SagaIterator {
  try {
    const response: AxiosResponse<Msg> = yield call(api.post, 'groups', {
      name: payload.name,
    });

    yield put(addGroupSuccess(response.data.msg));
  } catch (err) {
    if (err.message === 'Network Error') {
      yield put(
        addGroupFailure(
          'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.',
        ),
      );
    } else if (err.response) {
      yield put(addGroupFailure(err.response.data.msg));
    } else {
      yield put(addGroupFailure(err));
    }
  }
}

export function* updateGroup({ payload }: IGroup): SagaIterator {
  try {
    const response: AxiosResponse<Msg> = yield call(
      api.put,
      `groups/${payload.id}`,
      {
        name: payload.name,
      },
    );

    yield put(updateGroupSuccess(response.data.msg));
  } catch (err) {
    if (err.message === 'Network Error') {
      yield put(
        updateGroupFailure(
          'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.',
        ),
      );
    } else if (err.response) {
      yield put(updateGroupFailure(err.response.data.msg));
    } else {
      yield put(updateGroupFailure(err));
    }
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
    if (err.message === 'Network Error') {
      yield put(
        deleteGroupFailure(
          'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.',
        ),
      );
    } else if (err.response) {
      yield put(deleteGroupFailure(err.response.data.msg));
    } else {
      yield put(deleteGroupFailure(err));
    }
  }
}

export default all([
  takeLatest(GroupsTypes.GET_GROUPS_REQUEST, getGroups),
  takeLatest(GroupsTypes.ADD_GROUP_REQUEST, addGroup),
  takeLatest(GroupsTypes.UPDATE_GROUP_REQUEST, updateGroup),
  takeLatest(GroupsTypes.DELETE_GROUP_REQUEST, deleteGroup),
]);
