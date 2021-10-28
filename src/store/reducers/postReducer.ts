import { IPostData } from './@dataModals/post';
import { CREATE_POST_ACTIONS, GET_POST_ACTIONS } from '../actions/postActionTypes';

interface IPostReducerState {
  loading: boolean;
  data: IPostData[];
  error: string | undefined;
}

const initialState: IPostReducerState = {
  loading: false,
  data: [],
  error: undefined,
};

const postReducer = (state = initialState, action: any): IPostReducerState => {
  switch (action.type) {
    case CREATE_POST_ACTIONS.START:
      return { ...initialState, loading: true };

    case CREATE_POST_ACTIONS.SUCCESS:
      return { ...initialState };

    case CREATE_POST_ACTIONS.FAILED:
      return { ...initialState, error: 'Failed to create post' };

    case GET_POST_ACTIONS.START:
      return { ...initialState, loading: true };

    case GET_POST_ACTIONS.SUCCESS:
      return { ...initialState, data: action.payload };

    case GET_POST_ACTIONS.FAILED:
      return { ...initialState, error: 'Failed to get posts' };

    default:
      return state;
  }
};

export default postReducer;
