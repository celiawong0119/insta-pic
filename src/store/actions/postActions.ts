import axios from 'axios';

import { AppThunk } from '../../libAddons/redux-thunk';
import { IApiPostPayload } from './@apiTypes/post';
import { CREATE_POST_ACTIONS } from './postActionTypes';

export const createPost =
  ({ userId, imageFile, caption }: IApiPostPayload): AppThunk =>
  async (dispatch) => {
    dispatch({ type: CREATE_POST_ACTIONS.START });
    try {
      await axios.post(`${axios.defaults.baseURL}/api/posts`, {
        userId: userId,
        imageFile: imageFile,
        caption: caption,
      });

      dispatch({ type: CREATE_POST_ACTIONS.SUCCESS });
    } catch (err) {
      dispatch({ type: CREATE_POST_ACTIONS.FAILED });
    }
  };
