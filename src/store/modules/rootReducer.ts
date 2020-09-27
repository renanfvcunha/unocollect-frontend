import { combineReducers } from 'redux';
import pageTitle from './pageTitle';
import auth from './auth';
import users from './users';
import forms from './forms';
import fills from './fills';
import categories from './categories';
import images from './images';

export default combineReducers({
  pageTitle,
  auth,
  users,
  forms,
  fills,
  categories,
  images,
});
