import { takeLatest, call, put, all } from 'redux-saga/effects';
import { AnyAction } from 'redux';

import api from '../../../services/api';
import { FillsTypes, Fill } from './types';
import { Form } from '../forms/types';
import {
  getFillsSuccess,
  getFillsFailure,
  addFillSuccess,
  addFillFailure,
} from './actions';

export function* getFills() {
  try {
    const response = yield call(api.get, 'fills');

    yield put(getFillsSuccess(response.data));
  } catch (err) {
    alert(err.response.data.msg);

    yield put(getFillsFailure(err.response.data.msg));
  }
}

export function* addFill({ payload }: AnyAction) {
  try {
    const response = yield call(
      api.post,
      `fills/${payload.data.formId}`,
      payload.data,
    );

    alert(response.data.msg);
    yield put(addFillSuccess(response.data.msg));
  } catch (err) {
    alert(err.response.data.msg);
    yield put(addFillFailure(err.response.data.msg));
  }
}

export default all([
  takeLatest(FillsTypes.GET_FILLS_REQUEST, getFills),
  takeLatest(FillsTypes.ADD_FILL_REQUEST, addFill),
]);
