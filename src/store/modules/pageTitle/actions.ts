import { action } from 'typesafe-actions';
import { Action } from 'redux';

import { PageTitleTypes } from './types';

const setPageTitle = (title: string): Action =>
  action(PageTitleTypes.SET_PAGE_TITLE, { title });

export default setPageTitle;
