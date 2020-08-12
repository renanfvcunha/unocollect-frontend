import { takeLatest, call, put, all } from 'redux-saga/effects';
import { AnyAction } from 'redux';

import api from '../../../services/api';
import { FormsTypes, Form } from './types';
import {
  addFormSuccess,
  adddFormFailure,
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
    alert(err.response.data.msg);
    yield put(adddFormFailure(err.response.data.msg));
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
  takeLatest(FormsTypes.GET_FORM_REQUEST, getForm),
]);
