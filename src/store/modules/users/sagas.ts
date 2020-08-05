import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '../../../services/api';
import { UsersTypes } from './types';
import { getUsersSuccess, getUsersFailure } from './actions';

export function* getUsers() {
  try {
    const response = yield call(api.get, 'users');

    yield put(getUsersSuccess(response.data));
  } catch (err) {
    alert(err.response.data.msg);
    yield put(getUsersFailure());
  }
}

export default all([
  takeLatest(UsersTypes.GET_USERS_REQUEST, getUsers),
]);
