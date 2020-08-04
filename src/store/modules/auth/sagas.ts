import { takeLatest, call, put, all } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import tron from '../../../config/ReactotronConfig';
import api from '../../../services/api';
import { AuthTypes } from './types';
import { loginSuccess, loginFailure } from './actions';

interface Payload extends AnyAction {
  payload: {
    username: string;
    password: string;
  }
}

export function* login({ payload }: Payload) {
  try {
    const { username, password } = payload;
  
    const response = yield call(api.post, 'session', {
      username,
      password
    });
  
    const { token, user } = response.data;
  
    api.defaults.headers.Authorization = `Bearer ${token}`
  
    yield put(loginSuccess(token, user));
  } catch (err) {
    alert(err.response.data.msg);
    yield put(loginFailure());
  }
}

export default all([
  takeLatest(AuthTypes.LOGIN_REQUEST, login)
]);
