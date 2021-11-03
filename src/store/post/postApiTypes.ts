export interface ApiCreatePostPayload {
  userId: number;
  imageFile: File;
  caption: string;
  refreshOptions?: {
    userId?: number;
    sortByTime: 'asc' | 'desc';
  };
}
export interface ApiGetPostPayload {
  userId?: string;
  sortByTime?: 'asc' | 'desc';
  pageNo?: number;
  tailId?: number;
}
