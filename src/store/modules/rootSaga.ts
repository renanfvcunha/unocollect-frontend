import { all } from 'redux-saga/effects';
import auth from './auth/sagas';
import users from './users/sagas';
import forms from './forms/sagas';
import categories from './categories/sagas';

export default function* rootSaga() {
  return yield all([auth, users, forms, categories]);
}
