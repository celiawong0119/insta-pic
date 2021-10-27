import { IUserData } from './@dataModals/auth';
import { LOGIN_ACTIONS, SIGNUP_ACTIONS, LOGOUT_ACTIONS } from '../actions/authActionTypes';

interface IUserReducerState {
  loading: boolean;
  data: IUserData | undefined;
  error: string | undefined;
}

const initialState: IUserReducerState = {
  loading: false,
  data: undefined,
  error: undefined,
};

const userReducer = (state = initialState, action: any): IUserReducerState => {
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

    default:
      return state;
  }
};

export default userReducer;
