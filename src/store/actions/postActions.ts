import { AppThunk } from '../../libAddons/redux-thunk';
import { IApiCreatePostPayload, IApiGetPostPayload } from './@apiTypes/post';
import { CREATE_POST_ACTIONS, GET_POST_ACTIONS } from './postActionTypes';
import { postRequest, getRequest } from '../../libAddons/axios';

export const createPost =
  ({ userId, imageFile, caption }: IApiCreatePostPayload): AppThunk =>
  async (dispatch) => {
    dispatch({ type: CREATE_POST_ACTIONS.START });
    try {
      const imageFormData = new FormData();
      imageFormData.append('file', imageFile);

      // upload image
      const response = await postRequest<FormData, never>({
        url: '/api/posts/upload-image',
        payload: imageFormData,
      });

      const imageName = response.data;

      if (imageName) {
        // create post
        const response = await postRequest<
          Omit<IApiCreatePostPayload, 'imageFile'> & { imageName: string },
          { newPostId: number }
        >({
          url: '/api/posts',
          payload: {
            userId: userId,
            imageName: imageName,
            caption: caption,
          },
        });

        dispatch({ type: CREATE_POST_ACTIONS.SUCCESS, payload: response.data.newPostId });
      } else {
        dispatch({ type: CREATE_POST_ACTIONS.FAILED });
      }
    } catch (err) {
      dispatch({ type: CREATE_POST_ACTIONS.FAILED });
    }
  };

export const getPosts =
  ({ userId, sortByTime = 'desc', pageNo = 1 }: IApiGetPostPayload): AppThunk =>
  async (dispatch) => {
    dispatch({ type: GET_POST_ACTIONS.START });
    try {
      const response = await getRequest<
        IApiGetPostPayload,
        { postId: number; image: string; caption: string; createdDate: number }[]
      >({
        url: '/api/posts',
        params: {
          userId: userId,
          sortByTime: sortByTime,
          pageNo: pageNo,
        },
      });

      dispatch({ type: GET_POST_ACTIONS.SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: GET_POST_ACTIONS.FAILED });
    }
  };
