import { takeLatest, call, put, all } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { createBrowserHistory } from 'history';
import api from '../../../services/api';
import { AuthTypes } from './types';
import { loginSuccess, loginFailure } from './actions';

interface Payload extends AnyAction {
  payload: {
    username: string;
    password: string;
  }
}

const history = createBrowserHistory();

export function* login({ payload }: Payload) {
  try {
    const { username, password } = payload;
  
    const response = yield call(api.post, 'session', {
      username,
      password
    });
  
    const { token, user } = response.data;
  
    api.defaults.headers.Authorization = `Bearer ${token}`;

    if (!user.admin) {
      yield history.push('/forms');
    }

    yield put(loginSuccess(token, user));
  } catch (err) {
    alert(err.response.data.msg);
    yield put(loginFailure());
  }
}

export function* logout() {
  yield history.push('/');
}

export function setToken({ payload }: AnyAction) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest(AuthTypes.LOGIN_REQUEST, login),
  takeLatest(AuthTypes.LOGOUT, logout)
]);
