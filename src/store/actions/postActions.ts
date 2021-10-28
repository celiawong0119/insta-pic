import { AppThunk } from '../../libAddons/redux-thunk';
import { IApiPostPayload } from './@apiTypes/post';
import { CREATE_POST_ACTIONS } from './postActionTypes';
import { postRequest } from '../../libAddons/axios';

export const createPost =
  ({ userId, imageFile, caption }: IApiPostPayload): AppThunk =>
  async (dispatch) => {
    dispatch({ type: CREATE_POST_ACTIONS.START });
    try {
      await postRequest<IApiPostPayload, never>({
        url: '/api/posts',
        payload: {
          userId: userId,
          imageFile: imageFile,
          caption: caption,
        },
      });

      dispatch({ type: CREATE_POST_ACTIONS.SUCCESS });
    } catch (err) {
      dispatch({ type: CREATE_POST_ACTIONS.FAILED });
    }
  };
