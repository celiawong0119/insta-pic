export interface IApiCreatePostPayload {
  userId: number;
  imageFile: File;
  caption: string;
}

export interface IApiGetPostPayload {
  userId: number;
  sortByTime?: 'asc' | 'desc';
  pageNo?: number;
}
