import { takeLatest, call, put, all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { AnyAction } from 'redux';
import { AxiosResponse } from 'axios';

import api from '../../../services/api';
import { ImagesTypes } from './types';
import { getUsersImagesSuccess, getUsersImagesFailure } from './actions';

type Err = Error & {
  response: AxiosResponse;
};

export function* getUsersImages({ payload }: AnyAction): SagaIterator {
  try {
    const response = yield call(api.get, `images/${payload.id}`);

    yield put(getUsersImagesSuccess(response.data));
  } catch (err) {
    yield put(getUsersImagesFailure((err as Err).response.data.msg));
  }
}

export default all([
  takeLatest(ImagesTypes.GET_USERS_IMAGES_REQUEST, getUsersImages),
]);
