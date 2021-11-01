import { IPostData } from './postModal';
import { CREATE_POST_ACTIONS, GET_MORE_POST_ACTIONS, GET_POST_ACTIONS } from './postActionTypes';

interface IPostReducerState {
  loading: boolean;
  latestPage: number;
  data: IPostData[];
  hasMore: boolean;
  error: string | undefined;
}

const initialState: IPostReducerState = {
  loading: false,
  latestPage: 1,
  data: [],
  hasMore: true,
  error: undefined,
};

const postReducer = (state = initialState, action: any): IPostReducerState => {
  switch (action.type) {
    // create post
    case CREATE_POST_ACTIONS.START:
      return { ...state, loading: true };

    case CREATE_POST_ACTIONS.SUCCESS:
      return { ...state, loading: false, error: undefined };

    case CREATE_POST_ACTIONS.FAILED:
      return { ...initialState, error: 'Failed to create post' };

    // get first page of posts
    case GET_POST_ACTIONS.START:
      return { ...initialState, loading: true };

    case GET_POST_ACTIONS.SUCCESS:
      return { ...initialState, data: action.payload.posts, hasMore: action.payload.posts.length < 5 ? false : true };

    case GET_POST_ACTIONS.FAILED:
      return { ...initialState, error: 'Failed to get posts' };

    // get more posts
    case GET_MORE_POST_ACTIONS.START:
      return { ...state, loading: true };

    case GET_MORE_POST_ACTIONS.SUCCESS:
      return {
        ...state,
        data: [...state.data, ...action.payload.posts],
        latestPage: action.payload.posts.length > 0 ? action.payload.pageNo : state.latestPage,
        hasMore: action.payload.posts.length < 5 ? false : true,
        error: undefined,
      };

    case GET_MORE_POST_ACTIONS.FAILED:
      return { ...state, error: 'Failed to get more posts' };

    default:
      return state;
  }
};

export default postReducer;
