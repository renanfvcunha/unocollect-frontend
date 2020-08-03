import { combineReducers } from 'redux';
import pageTitle from './pageTitle';
import auth from './auth';

export default combineReducers({
  pageTitle,
  auth,
});
