import { AxiosResponse } from 'axios';
import { getRequest } from '../libAddons/axios';
import { ApiGetPostPayload } from '../store/post/postApiTypes';
import { PostData } from '../store/post/postModal';

interface FetchPost {
  userId?: string;
  sortByTime?: 'asc' | 'desc';
  pageNo?: number;
  tailId?: number;
}

interface FetchPostResponse {
  authorName?: string;
  posts: PostData[];
}

export const fetchPost = ({
  userId,
  sortByTime = 'desc',
  pageNo,
  tailId,
}: FetchPost): Promise<AxiosResponse<FetchPostResponse, any>> => {
  return getRequest<ApiGetPostPayload, FetchPostResponse>({
    url: '/api/posts',
    params: {
      userId: userId,
      sortByTime: sortByTime,
      pageNo: pageNo,
      tailId: tailId,
    },
  });
};
