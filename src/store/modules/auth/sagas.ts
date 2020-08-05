import { takeLatest, call, put, all } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { createBrowserHistory } from 'history';
import { AxiosResponse } from 'axios';

import api from '../../../services/api';
import { AuthTypes, User } from './types';
import { loginSuccess, loginFailure } from './actions';

interface Payload extends AnyAction {
  payload: {
    username: string;
    password: string;
  };
}

interface Response {
  token: string;
  user: User;
}

const history = createBrowserHistory();

export function* login({ payload }: Payload) {
  try {
    const { username, password } = payload;

    const response: AxiosResponse<Response> = yield call(api.post, 'session', {
      username,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    if (!user.admin) {
      history.push('/forms');
    }

    yield put(loginSuccess(token, user));
  } catch (err) {
    yield put(loginFailure(err.response.data.msg));
  }
}

export function logout(): void {
  history.push('/');
}

export function setToken({ payload }: AnyAction): void {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest(AuthTypes.LOGIN_REQUEST, login),
  takeLatest(AuthTypes.LOGOUT, logout),
]);
