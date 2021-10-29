export interface IApiCreatePostPayload {
  userId: number;
  imageFile: File;
  caption: string;
}

export interface IApiGetPostPayload {
  userId?: string;
  sortByTime?: 'asc' | 'desc';
  pageNo?: number;
}
