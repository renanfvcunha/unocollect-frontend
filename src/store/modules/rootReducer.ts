import { combineReducers } from 'redux';
import pageTitle from './pageTitle';
import auth from './auth';
import users from './users';

export default combineReducers({
  pageTitle,
  auth,
  users,
});
