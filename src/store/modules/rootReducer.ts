import { combineReducers } from 'redux';
import pageTitle from './pageTitle';
import auth from './auth';
import users from './users';
import forms from './forms';
import categories from './categories';
import fills from './fills';
import images from './images';

export default combineReducers({
  pageTitle,
  auth,
  users,
  forms,
  categories,
  fills,
  images,
});
