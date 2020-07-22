interface Action {
  type: string;
  title: string;
}

interface PageTitle {
  title: string;
}

export default function pageTitle(
  state = '',
  action: Action,
): PageTitle | string {
  if (action.type === 'SET_PAGE_TITLE') {
    return { title: action.title };
  }

  return state;
}
