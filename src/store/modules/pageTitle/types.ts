/**
 * Action Types
 */

export enum PageTitleTypes {
  SET_PAGE_TITLE = '@page_title/SET_PAGE_TITLE',
}

/**
 * Data Types
 */

export interface PageTitleState {
  readonly title: string;
}
