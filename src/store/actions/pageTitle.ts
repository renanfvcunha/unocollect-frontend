interface SetPageTitle {
  type: string;
  title: string;
}

export default function setPageTitle(title: string): SetPageTitle {
  return {
    type: 'SET_PAGE_TITLE',
    title,
  };
}
