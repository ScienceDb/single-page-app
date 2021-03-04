export interface PageInfo {
  startCursor: undefined | string;
  endCursor: undefined | string;
  hasPreviousPage: undefined | boolean;
  hasNextPage: undefined | boolean;
}

export interface EdgePageInfo {
  data: Array<unknown>;
  pageInfo: PageInfo;
}

export interface ReadManyResponse {
  [key: string]: {
    edges: Array<{ node: unknown }>;
    pageInfo: PageInfo;
  };
}

export interface ReadOneResponse<T> {
  [key: string]: T;
}
