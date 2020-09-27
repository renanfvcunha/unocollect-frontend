import { takeLatest, call, put, all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { AnyAction } from 'redux';
import { AxiosResponse } from 'axios';

import api from '../../../services/api';
import { FormsTypes, Form } from './types';
import {
  addFormSuccess,
  addFormFailure,
  getFormsSuccess,
  getFormsFailure,
  getFormSuccess,
  getFormFailure,
  updateFormSuccess,
  updateFormFailure,
  alterFormStatusSuccess,
  alterFormStatusFailure,
  deleteFormSuccess,
  deleteFormFailure,
} from './actions';

interface IForm extends AnyAction {
  payload: {
    id?: number;
    data: Form;
  };
}

interface Msg {
  msg: string;
}

export function* addForm({ payload }: IForm): SagaIterator {
  try {
    const response: AxiosResponse<Msg> = yield call(api.post, 'forms', {
      ...payload.data,
      category: payload.data.category?.id,
    });

    yield put(addFormSuccess(response.data.msg));
  } catch (err) {
    if (err.message === 'Network Error') {
      yield put(addFormFailure('Erro ao conectar ao servidor.'));
    } else if (err.response) {
      yield put(addFormFailure(err.response.data.msg));
    } else {
      yield put(addFormFailure(err));
    }
  }
}

export function* getForms(): SagaIterator {
  try {
    const response: AxiosResponse = yield call(
      api.get,
      'forms?per_page=15&page=1',
    );

    yield put(getFormsSuccess(response.data.forms));
  } catch (err) {
    if (err.message === 'Network Error') {
      yield put(
        getFormsFailure(
          'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte',
        ),
      );
    } else if (err.response) {
      yield put(getFormsFailure(err.response.data.msg));
    } else {
      yield put(getFormsFailure(err));
    }
  }
}

export function* getForm({ payload }: AnyAction): SagaIterator {
  try {
    const response: AxiosResponse<Form> = yield call(
      api.get,
      `forms/${payload.id}`,
    );

    yield put(getFormSuccess(response.data));
  } catch (err) {
    alert(err.response.data.msg);
    yield put(getFormFailure(err.response.data.msg));
  }
}

export function* editForm({ payload }: IForm): SagaIterator {
  try {
    const response: AxiosResponse<Msg> = yield call(
      api.put,
      `forms/${payload.id}`,
      {
        ...payload.data,
        category: payload.data.category?.id,
      },
    );

    yield put(updateFormSuccess(response.data.msg));
  } catch (err) {
    if (err.message === 'Network Error') {
      yield put(updateFormFailure('Erro ao conectar ao servidor.'));
    } else if (err.response) {
      yield put(updateFormFailure(err.response.data.msg));
    } else {
      yield put(updateFormFailure(err));
    }
  }
}

export function* alterFormStatus({ payload }: AnyAction): SagaIterator {
  try {
    const response: AxiosResponse<Msg> = yield call(
      api.put,
      `forms/${payload.id}`,
      {
        status: payload.status,
      },
    );

    yield put(alterFormStatusSuccess(response.data.msg));
  } catch (err) {
    if (err.message === 'Network Error') {
      yield put(
        alterFormStatusFailure(
          'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.',
        ),
      );
    } else if (err.response) {
      yield put(alterFormStatusFailure(err.response.data.msg));
    } else {
      yield put(alterFormStatusFailure(err));
    }
  }
}

export function* deleteForm({ payload }: AnyAction): SagaIterator {
  try {
    const response: AxiosResponse<Msg> = yield call(
      api.delete,
      `forms/${payload.id}`,
    );

    yield put(deleteFormSuccess(response.data.msg));
  } catch (err) {
    if (err.message === 'Network Error') {
      yield put(
        deleteFormFailure(
          'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.',
        ),
      );
    } else if (err.response) {
      yield put(deleteFormFailure(err.response.data.msg));
    } else {
      yield put(deleteFormFailure(err));
    }
  }
}

export default all([
  takeLatest(FormsTypes.ADD_FORM_REQUEST, addForm),
  takeLatest(FormsTypes.GET_FORMS_REQUEST, getForms),
  takeLatest(FormsTypes.GET_FORM_REQUEST, getForm),
  takeLatest(FormsTypes.UPDATE_FORM_REQUEST, editForm),
  takeLatest(FormsTypes.ALTER_FORM_STATUS_REQUEST, alterFormStatus),
  takeLatest(FormsTypes.DELETE_FORM_REQUEST, deleteForm),
]);
