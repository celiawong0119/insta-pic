import { UserData } from './userModal';
import { LOGIN_ACTIONS, SIGNUP_ACTIONS, LOGOUT_ACTIONS, VERIFY_TOKEN_ACTIONS } from './userActionTypes';
import { CREATE_POST_ACTIONS } from '../post/postActionTypes';

interface UserReducerState {
  loading: boolean;
  data: UserData | undefined;
  error: string | undefined;
}

const initialState: UserReducerState = {
  loading: false,
  data: undefined,
  error: undefined,
};

const userReducer = (state = initialState, action: any): UserReducerState => {
  switch (action.type) {
    case LOGIN_ACTIONS.START:
      return { ...initialState, loading: true };

    case LOGIN_ACTIONS.SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: undefined,
      };

    case LOGIN_ACTIONS.FAILED:
      return { ...state, error: action.payload, loading: false };

    case SIGNUP_ACTIONS.START:
      return { ...initialState, loading: true };

    case SIGNUP_ACTIONS.SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: undefined,
      };

    case SIGNUP_ACTIONS.FAILED:
      return { ...state, error: action.payload, loading: false };

    case LOGOUT_ACTIONS.SUCCESS:
      return {
        ...initialState,
      };

    case VERIFY_TOKEN_ACTIONS.START:
      return { ...initialState };

    case VERIFY_TOKEN_ACTIONS.SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: undefined,
      };

    case VERIFY_TOKEN_ACTIONS.FAILED:
      return { ...state, error: action.payload };

    case CREATE_POST_ACTIONS.SUCCESS:
      return {
        ...state,
        data: { ...state.data!, posts: [action.payload].concat(state!.data!.posts) },
        error: undefined,
      };

    default:
      return state;
  }
};

export default userReducer;
