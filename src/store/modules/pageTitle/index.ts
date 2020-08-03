import { Reducer } from 'redux';
import { PageTitleState, PageTitleTypes } from './types';

const INITIAL_STATE: PageTitleState = {
  title: '',
}

const reducer: Reducer<PageTitleState> = (state = INITIAL_STATE, action ) => {
  switch (action.type) {
    case PageTitleTypes.SET_PAGE_TITLE:
      return { title: action.title };
  
    default:
      return state;
  }
}

/* export default function pageTitle(
  state = '',
  action: Action,
): PageTitle | string {
  if (action.type === 'SET_PAGE_TITLE') {
    return { title: action.title };
  }

  return state;
}
 */

export default reducer;
