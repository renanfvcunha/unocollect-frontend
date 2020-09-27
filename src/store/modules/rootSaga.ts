import { SagaIterator } from 'redux-saga';
import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import users from './users/sagas';
import forms from './forms/sagas';
import fills from './fills/sagas';
import categories from './categories/sagas';
import images from './images/sagas';

export default function* rootSaga(): SagaIterator {
  return yield all([auth, users, forms, fills, categories, images]);
}
