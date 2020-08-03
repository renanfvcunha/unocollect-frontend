export default function setPageTitle(title: string) {
  return {
    type: '@page_title/SET_PAGE_TITLE',
    title,
  };
}
