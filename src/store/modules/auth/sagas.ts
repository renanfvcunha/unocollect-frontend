import { takeLatest, call, put, all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { AnyAction } from 'redux';
import { createBrowserHistory } from 'history';
import { AxiosResponse } from 'axios';

import api from '../../../services/api';
import { AuthTypes, User } from './types';
import {
  loginSuccess,
  loginFailure,
  checkTokenSuccess,
  checkTokenFailure,
  checkHasUserSuccess,
  checkHasUserFailure,
  addFisrtUserSuccess,
  addFisrtUserFailure,
} from './actions';

interface Payload extends AnyAction {
  payload: {
    name?: string;
    username: string;
    password: string;
    passwordConf?: string;
  };
}

interface Response {
  token: string;
  user: User;
}

type Err = Error & {
  response: AxiosResponse;
};

const history = createBrowserHistory();

export function* login({ payload }: Payload): SagaIterator {
  try {
    const { username, password } = payload;

    const response: AxiosResponse<Response> = yield call(api.post, 'session', {
      username,
      password,
    });

    if (!response.data.user.admin) {
      yield put(
        loginFailure('Aplicação acessível somente para administradores!'),
      );
      return;
    }

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(loginSuccess(token, user));
  } catch (err) {
    if ((err as Err).message === 'Network Error') {
      yield put(
        loginFailure(
          'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.',
        ),
      );
    } else if ((err as Err).response) {
      yield put(loginFailure((err as Err).response.data.msg));
    } else {
      yield put(loginFailure((err as Err).message));
    }
  }
}

export function* checkToken(): SagaIterator {
  try {
    yield call(api.get, 'checktoken');

    yield put(checkTokenSuccess());
  } catch (err) {
    if ((err as Err).message === 'Network Error') {
      yield put(checkTokenSuccess());
    } else if ((err as Err).response) {
      yield put(checkTokenFailure((err as Err).response.data.msg));
    } else {
      yield put(checkTokenFailure((err as Err).message));
    }
  }
}

export function* checkHasUser(): SagaIterator {
  try {
    yield call(api.get, 'checkhasuser');

    yield put(checkHasUserSuccess());
  } catch (err) {
    if ((err as Err).message === 'Network Error') {
      yield put(checkHasUserSuccess());
    } else if ((err as Err).response) {
      yield put(checkHasUserFailure());
    } else {
      yield put(checkHasUserSuccess());
    }
  }
}

export function* addFirstUser({ payload }: Payload): SagaIterator {
  try {
    const { name, username, password, passwordConf } = payload;

    const response: AxiosResponse<Response> = yield call(
      api.post,
      'firstuser',
      {
        name,
        username,
        password,
        passwordConf,
      },
    );

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(addFisrtUserSuccess(token, user));
  } catch (err) {
    if ((err as Err).message === 'Network Error') {
      yield put(
        addFisrtUserFailure(
          'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.',
        ),
      );
    } else if ((err as Err).response) {
      yield put(addFisrtUserFailure((err as Err).response.data.msg));
    } else {
      yield put(addFisrtUserFailure((err as Err).message));
    }
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
  takeLatest(AuthTypes.CHECK_TOKEN_REQUEST, checkToken),
  takeLatest(AuthTypes.CHECK_HAS_USER_REQUEST, checkHasUser),
  takeLatest(AuthTypes.ADD_FIRST_USER_REQUEST, addFirstUser),
  takeLatest(AuthTypes.LOGOUT, logout),
]);
