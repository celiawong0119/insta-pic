import { CREATE_POST_ACTIONS } from '../actions/postActionTypes';

interface IPostReducerState {
  loading: boolean;
  error: string | undefined;
}

const initialState: IPostReducerState = {
  loading: false,
  error: undefined,
};

const postReducer = (state = initialState, action: any): IPostReducerState => {
  switch (action.type) {
    case CREATE_POST_ACTIONS.START:
      return { ...initialState, loading: true };

    case CREATE_POST_ACTIONS.SUCCESS:
      return { ...initialState };

    case CREATE_POST_ACTIONS.FAILED:
      return { ...state, error: 'Failed to create post' };

    default:
      return state;
  }
};

export default postReducer;
