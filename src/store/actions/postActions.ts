import { AppThunk } from '../../libAddons/redux-thunk';
import { IApiCreatePostPayload, IApiGetPostPayload } from './@apiTypes/post';
import { CREATE_POST_ACTIONS, GET_POST_ACTIONS, GET_MORE_POST_ACTIONS } from './postActionTypes';
import { postRequest } from '../../libAddons/axios';
import { fetchPost } from '../../services/postServices';

export const createPost =
  ({ userId, imageFile, caption, refreshOptions }: IApiCreatePostPayload): AppThunk =>
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
        if (refreshOptions) {
          const { userId, sortByTime } = refreshOptions;
          dispatch(getPosts({ userId: userId ? userId.toString() : undefined, sortByTime: sortByTime }));
        }
      } else {
        dispatch({ type: CREATE_POST_ACTIONS.FAILED });
      }
    } catch (err) {
      dispatch({ type: CREATE_POST_ACTIONS.FAILED });
    }
  };

export const getPosts =
  ({ userId, sortByTime = 'desc', pageNo = 1, tailId }: IApiGetPostPayload): AppThunk =>
  async (dispatch) => {
    const action =
      pageNo > 1
        ? {
            start: GET_MORE_POST_ACTIONS.START,
            success: GET_MORE_POST_ACTIONS.SUCCESS,
            failed: GET_MORE_POST_ACTIONS.FAILED,
          }
        : { start: GET_POST_ACTIONS.START, success: GET_POST_ACTIONS.SUCCESS, failed: GET_POST_ACTIONS.FAILED };
    dispatch({ type: action.start });
    try {
      const response = await fetchPost({ userId, sortByTime, pageNo, tailId });
      dispatch({ type: action.success, payload: { posts: response.data, pageNo: pageNo } });
    } catch (err) {
      dispatch({ type: action.failed });
    }
  };
