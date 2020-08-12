import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '../../../services/api';
import { CategoriesTypes, Category } from './types';
import { getCategoriesSuccess, getCategoriesFailure } from './actions';

interface Response {
  data: Category;
}

export function* getCategories() {
  try {
    const response: Response = yield call(api.get, 'categories');

    yield put(getCategoriesSuccess(response.data));
  } catch (err) {
    alert(err.response.data.msg);
    yield put(getCategoriesFailure(err.response.data.msg));
  }
}

export default all([
  takeLatest(CategoriesTypes.GET_CATEGORIES_REQUEST, getCategories),
]);
