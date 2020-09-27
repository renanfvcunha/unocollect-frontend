import { takeLatest, call, put, all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { AnyAction } from 'redux';
import { AxiosResponse } from 'axios';

import api from '../../../services/api';
import { FillsTypes } from './types';
import {
  addFillSuccess,
  addFillFailure,
  getFormsSuccess,
  getFormsFailure,
} from './actions';

interface Msg {
  msg: string;
}

export function* getForms(): SagaIterator {
  try {
    const response = yield call(api.get, 'fills');

    yield put(getFormsSuccess(response.data));
  } catch (err) {
    if (err.response) {
      alert(err.response.data.msg);
      yield put(getFormsFailure());
    } else if (err.message === 'Network Error') {
      yield put(getFormsFailure());
    } else {
      alert(err);
      yield put(getFormsFailure());
    }
  }
}

export function* addFill({ payload }: AnyAction): SagaIterator {
  try {
    const response: AxiosResponse<Msg> = yield call(
      api.post,
      `fills/${payload.formId}`,
      payload.data,
      {
        headers: {
          'content-type': 'multipart/formdata',
        },
      },
    );

    alert(response.data.msg);
    yield put(addFillSuccess(response.data.msg));
  } catch (err) {
    if (err.message === 'Network Error') {
      yield put(addFillFailure());
      alert('Não foi possível conectar ao servidor.');
    } else if (err.response) {
      alert(err.response.data.msg);
      yield put(addFillFailure());
    } else {
      alert(err);
      yield put(addFillFailure());
    }
  }
}

export default all([
  takeLatest(FillsTypes.GET_FORMS_REQUEST, getForms),
  takeLatest(FillsTypes.ADD_FILL_REQUEST, addFill),
]);
