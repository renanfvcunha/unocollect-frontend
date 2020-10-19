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
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategorySuccess,
  deleteCategoryFailure,
} from './actions';

interface Msg {
  msg: string;
}

interface ICategory extends AnyAction {
  payload: {
    id?: number;
    name?: string;
  };
}

export function* getCategories(): SagaIterator {
  try {
    const response: AxiosResponse<Category> = yield call(api.get, 'categories');

    yield put(getCategoriesSuccess(response.data));
  } catch (err) {
    yield put(getCategoriesFailure(err.response.data.msg));
  }
}

export function* addCategory({ payload }: ICategory): SagaIterator {
  try {
    const response: AxiosResponse<Msg> = yield call(api.post, 'categories', {
      name: payload.name,
    });

    yield put(addCategorySuccess(response.data.msg));
  } catch (err) {
    yield put(addCategoryFailure(err.response.data.msg));
  }
}

export function* updateCategory({ payload }: ICategory): SagaIterator {
  try {
    const response: AxiosResponse<Msg> = yield call(
      api.put,
      `categories/${payload.id}`,
      {
        name: payload.name,
      },
    );

    yield put(updateCategorySuccess(response.data.msg));
  } catch (err) {
    if (err.message === 'Network Error') {
      yield put(
        updateCategoryFailure(
          'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.',
        ),
      );
    } else if (err.response) {
      yield put(updateCategoryFailure(err.response.data.msg));
    } else {
      yield put(updateCategoryFailure(err));
    }
  }
}

export function* deleteCategory({ payload }: ICategory): SagaIterator {
  try {
    const response: AxiosResponse<Msg> = yield call(
      api.delete,
      `categories/${payload.id}`,
    );

    yield put(deleteCategorySuccess(response.data.msg));
  } catch (err) {
    if (err.message === 'Network Error') {
      yield put(
        deleteCategoryFailure(
          'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.',
        ),
      );
    } else if (err.response) {
      yield put(deleteCategoryFailure(err.response.data.msg));
    } else {
      yield put(deleteCategoryFailure(err));
    }
  }
}

export default all([
  takeLatest(CategoriesTypes.GET_CATEGORIES_REQUEST, getCategories),
  takeLatest(CategoriesTypes.ADD_CATEGORY_REQUEST, addCategory),
  takeLatest(CategoriesTypes.UPDATE_CATEGORY_REQUEST, updateCategory),
  takeLatest(CategoriesTypes.DELETE_CATEGORY_REQUEST, deleteCategory),
]);
