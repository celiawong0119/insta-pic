export interface IApiCreatePostPayload {
  userId: number;
  imageFile: File;
  caption: string;
  refreshOptions?: {
    userId?: number;
    sortByTime: 'asc' | 'desc';
  };
}
export interface IApiGetPostPayload {
  userId?: string;
  sortByTime?: 'asc' | 'desc';
  pageNo?: number;
  tailId?: number;
}
