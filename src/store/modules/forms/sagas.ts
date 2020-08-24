import { takeLatest, call, put, all } from 'redux-saga/effects';
import { AnyAction } from 'redux';

import api from '../../../services/api';
import { FormsTypes, Form } from './types';
import {
  addFormSuccess,
  addFormFailure,
  getFormsSuccess,
  getFormsFailure,
  getFormSuccess,
  getFormFailure,
} from './actions';

interface Payload extends AnyAction {
  payload: {
    data: Form;
  };
}

interface Response {
  data: {
    msg: string;
  };
}

export function* addForm({ payload }: Payload) {
  try {
    const response: Response = yield call(api.post, 'forms', payload.data);

    alert(response.data.msg);
    yield put(addFormSuccess(response.data.msg));
  } catch (err) {
    if (err.message === 'Network Error') {
      alert('Erro ao conectar ao servidor.');
      yield put(addFormFailure('Erro ao conectar ao servidor.'));
    } else if (err.response) {
      alert(err.response.data.msg);
      yield put(addFormFailure(err.response.data.msg));
    } else {
      alert(err);
      yield put(addFormFailure(err));
    }
  }
}

export function* getForms() {
  try {
    const response = yield call(api.get, 'forms?per_page=10&page=1');

    yield put(getFormsSuccess(response.data.forms));
  } catch (err) {
    if (err.response.data.msg) {
      alert(err.response.data.msg);
      yield put(getFormsFailure(err.response.data.msg));
    } else if (err.message === 'Network Error') {
      alert('Erro ao conectar ao servidor.');
      yield put(getFormsFailure('Erro ao conectar ao servidor.'));
    } else {
      alert(err);
      yield put(getFormsFailure(err));
    }
  }
}

export function* getForm({ payload }: AnyAction) {
  try {
    const response = yield call(api.get, `forms/${payload.id}`);

    yield put(getFormSuccess(response.data));
  } catch (err) {
    alert(err.response.data.msg);
    yield put(getFormFailure(err.response.data.msg));
  }
}

export default all([
  takeLatest(FormsTypes.ADD_FORM_REQUEST, addForm),
  takeLatest(FormsTypes.GET_FORMS_REQUEST, getForms),
  takeLatest(FormsTypes.GET_FORM_REQUEST, getForm),
]);
