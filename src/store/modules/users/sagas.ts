import { takeLatest, call, put, all } from 'redux-saga/effects';
import { AnyAction } from 'redux';

import api from '../../../services/api';
import { UsersTypes, User } from './types';
import { addUserSuccess, adddUserFailure } from './actions';

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

    alert(response.data.msg);
    yield put(addUserSuccess(response.data.msg));
  } catch (err) {
    alert(err.response.data.msg);
    yield put(adddUserFailure(err.response.data.msg));
  }
}

export default all([takeLatest(UsersTypes.ADD_USER_REQUEST, addUser)]);
