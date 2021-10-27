import { IUserData } from './@dataModals/auth';
import { LOGIN_ACTIONS, SIGNUP_ACTIONS } from '../actions/authActionTypes';

interface IUserReducerState {
  data: IUserData | undefined;
  error: string | undefined;
}
const initialState: IUserReducerState = {
  data: undefined,
  error: undefined,
};

const userReducer = (state = initialState, action: any): IUserReducerState => {
  switch (action.type) {
    case LOGIN_ACTIONS.START:
      return { ...initialState };
    case LOGIN_ACTIONS.SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: undefined,
      };
    case LOGIN_ACTIONS.FAILED:
      return { ...state, error: action.payload };

    case SIGNUP_ACTIONS.START:
      return { ...initialState };
    case SIGNUP_ACTIONS.SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: undefined,
      };
    case SIGNUP_ACTIONS.FAILED:
      return { ...state, error: action.payload };

    //   case LOG_OUT_ACTIONS.START:
    //     return { ...state, data: initialState.data, error: initialState.error };
    //   case LOG_OUT_ACTIONS.SUCCESS:
    //     return {
    //       ...state,
    //     };

    default:
      return state;
  }
};

export default userReducer;
