import { takeLatest, call, put, all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { AnyAction } from 'redux';
import { AxiosResponse } from 'axios';

import api from '../../../services/api';
import { UsersTypes, User } from './types';
import {
  addUserSuccess,
  addUserFailure,
  getUserSuccess,
  getUserFailure,
  updateUserSuccess,
  updateUserFailure,
  deleteUserSuccess,
  deleteUserFailure,
  getUsersFormsSuccess,
  getUsersFormsFailure,
} from './actions';

interface UserPayload extends AnyAction {
  payload: {
    id?: number;
    data: User;
  };
}

interface Response {
  data: {
    msg: string;
  };
}

type Err = Error & {
  response: AxiosResponse;
};

export function* addUser({ payload }: UserPayload): SagaIterator {
  try {
    const response: Response = yield call(api.post, 'users', payload.data);

    yield put(addUserSuccess(response.data.msg));
  } catch (err) {
    if ((err as Err).message === 'Network Error') {
      yield put(
        addUserFailure(
          'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.',
        ),
      );
    } else if ((err as Err).response) {
      yield put(addUserFailure((err as Err).response.data.msg));
    } else {
      yield put(addUserFailure((err as Err).message));
    }
  }
}

export function* getUser({ payload }: AnyAction): SagaIterator {
  try {
    const response = yield call(api.get, `users/${payload.id}`);

    yield put(getUserSuccess(response.data));
  } catch (err) {
    if ((err as Err).message === 'Network Error') {
      yield put(
        getUserFailure(
          'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.',
        ),
      );
    } else if ((err as Err).response) {
      yield put(getUserFailure((err as Err).response.data.msg));
    } else {
      yield put(getUserFailure((err as Err).message));
    }
  }
}

export function* updateUser({ payload }: UserPayload): SagaIterator {
  try {
    const response: Response = yield call(
      api.put,
      `users/${payload.id}`,
      payload.data,
    );

    yield put(updateUserSuccess(response.data.msg));
  } catch (err) {
    if ((err as Err).message === 'Network Error') {
      yield put(
        updateUserFailure(
          'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.',
        ),
      );
    } else if ((err as Err).response) {
      yield put(updateUserFailure((err as Err).response.data.msg));
    } else {
      yield put(updateUserFailure((err as Err).message));
    }
  }
}

export function* deleteUser({ payload }: AnyAction): SagaIterator {
  try {
    const response = yield call(api.delete, `users/${payload.id}`);

    yield put(deleteUserSuccess(response.data.msg));
  } catch (err) {
    if ((err as Err).message === 'Network Error') {
      yield put(
        deleteUserFailure(
          'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.',
        ),
      );
    } else if ((err as Err).response) {
      yield put(deleteUserFailure((err as Err).response.data.msg));
    } else {
      yield put(deleteUserFailure((err as Err).message));
    }
  }
}

export function* getUsersForms({ payload }: AnyAction): SagaIterator {
  try {
    const response = yield call(api.get, `userform/${payload.id}`);

    yield put(getUsersFormsSuccess(response.data));
  } catch (err) {
    if ((err as Err).message === 'Network Error') {
      yield put(
        getUsersFormsFailure(
          'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.',
        ),
      );
    } else if ((err as Err).response) {
      yield put(getUsersFormsFailure((err as Err).response.data.msg));
    } else {
      yield put(getUsersFormsFailure((err as Err).message));
    }
  }
}

export default all([
  takeLatest(UsersTypes.ADD_USER_REQUEST, addUser),
  takeLatest(UsersTypes.GET_USER_REQUEST, getUser),
  takeLatest(UsersTypes.UPDATE_USER_REQUEST, updateUser),
  takeLatest(UsersTypes.GET_USERS_FORMS_REQUEST, getUsersForms),
  takeLatest(UsersTypes.DELETE_USER_REQUEST, deleteUser),
]);
