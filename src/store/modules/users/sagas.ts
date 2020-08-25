import { takeLatest, call, put, all } from 'redux-saga/effects';
import { AnyAction } from 'redux';

import api from '../../../services/api';
import { UsersTypes, User } from './types';
import {
  addUserSuccess,
  addUserFailure,
  getUsersFormsSuccess,
  getUsersFormsFailure,
} from './actions';

interface Payload extends AnyAction {
  payload: {
    data: User;
  };
}

interface Response {
  data: {
    msg: string;
  };
}

export function* addUser({ payload }: Payload) {
  try {
    const response: Response = yield call(api.post, 'users', payload.data);

    yield put(addUserSuccess(response.data.msg));
  } catch (err) {
    if (err.message === 'Network Error') {
      yield put(addUserFailure('Erro ao conectar ao servidor.'));
    } else if (err.response) {
      yield put(addUserFailure(err.response.data.msg));
    } else {
      yield put(addUserFailure(err));
    }
  }
}

export function* getUsersForms({ payload }: AnyAction) {
  try {
    const response = yield call(api.get, `userform/${payload.id}`);

    yield put(getUsersFormsSuccess(response.data));
  } catch (err) {
    if (err.response.data.msg) {
      alert(err.response.data.msg);
      yield put(getUsersFormsFailure(err.response.data.msg));
    } else if (err.message === 'Network Error') {
      alert('Erro ao conectar ao servidor.');
      yield put(getUsersFormsFailure('Erro ao conectar ao servidor.'));
    } else {
      alert(err);
      yield put(getUsersFormsFailure(err));
    }
  }
}

export default all([
  takeLatest(UsersTypes.ADD_USER_REQUEST, addUser),
  takeLatest(UsersTypes.GET_USERS_FORMS_REQUEST, getUsersForms),
]);
