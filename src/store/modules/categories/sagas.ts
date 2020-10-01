import { takeLatest, call, put, all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { AnyAction } from 'redux';
import { AxiosResponse } from 'axios';

import api from '../../../services/api';
import { CategoriesTypes, Category } from './types';
import {
  getCategoriesSuccess,
  getCategoriesFailure,
  addCategorySuccess,
  addCategoryFailure,
} from './actions';

interface Msg {
  msg: string;
}

export function* getCategories(): SagaIterator {
  try {
    const response: AxiosResponse<Category> = yield call(api.get, 'categories');

    yield put(getCategoriesSuccess(response.data));
  } catch (err) {
    yield put(getCategoriesFailure(err.response.data.msg));
  }
}

export function* addCategory({ payload }: AnyAction): SagaIterator {
  try {
    const response: AxiosResponse<Msg> = yield call(
      api.post,
      'categories',
      payload,
    );

    yield put(addCategorySuccess(response.data.msg));
  } catch (err) {
    yield put(addCategoryFailure(err.response.data.msg));
  }
}

export default all([
  takeLatest(CategoriesTypes.GET_CATEGORIES_REQUEST, getCategories),
  takeLatest(CategoriesTypes.ADD_CATEGORY_REQUEST, addCategory),
]);
