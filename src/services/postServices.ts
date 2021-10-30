import { AxiosResponse } from 'axios';
import { getRequest } from '../libAddons/axios';
import { IApiGetPostPayload } from '../store/actions/@apiTypes/post';
import { IPostData } from '../store/reducers/@dataModals/post';

interface IFetchPost {
  userId?: string;
  sortByTime?: 'asc' | 'desc';
  pageNo?: number;
  tailId?: number;
}

export const fetchPost = ({
  userId,
  sortByTime = 'desc',
  pageNo,
  tailId,
}: IFetchPost): Promise<AxiosResponse<IPostData[], any>> => {
  return getRequest<IApiGetPostPayload, IPostData[]>({
    url: '/api/posts',
    params: {
      userId: userId,
      sortByTime: sortByTime,
      pageNo: pageNo,
      tailId: tailId,
    },
  });
};
