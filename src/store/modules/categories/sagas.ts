import { takeLatest, call, put, all } from 'redux-saga/effects';
import { AnyAction } from 'redux';

import api from '../../../services/api';
import { CategoriesTypes, Category } from './types';
import {
  getCategoriesSuccess,
  getCategoriesFailure,
  addCategorySuccess,
  addCategoryFailure,
} from './actions';
import tron from '../../../config/ReactotronConfig';

interface Response {
  data: Category;
}

export function* getCategories() {
  try {
    const response: Response = yield call(api.get, 'categories');

    yield put(getCategoriesSuccess(response.data));
  } catch (err) {
    yield put(getCategoriesFailure(err.response.data.msg));
  }
}

export function* addCategory({ payload }: AnyAction) {
  try {
    if (tron.log) {
      tron.log(payload);
    }
    const response = yield call(api.post, 'categories', payload);

    yield put(addCategorySuccess(response.data.msg));
  } catch (err) {
    yield put(addCategoryFailure(err.response.data.msg));
  }
}

export default all([
  takeLatest(CategoriesTypes.GET_CATEGORIES_REQUEST, getCategories),
  takeLatest(CategoriesTypes.ADD_CATEGORY_REQUEST, addCategory),
]);
