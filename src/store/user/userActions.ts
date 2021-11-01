import { AxiosError } from 'axios';

import { AppThunk } from '../../libAddons/redux-thunk';
import { setAuthTokenToCookie, clearAuthTokenInCookie } from '../../libAddons/universal-cookies';
import { postRequest } from '../../libAddons/axios';
import { IApiLoginOrSignUpPayload } from './userApiTypes';
import { IUserData } from './userModal';
import { LOGIN_ACTIONS, SIGNUP_ACTIONS, LOGOUT_ACTIONS, VERIFY_TOKEN_ACTIONS } from './userActionTypes';

export const login =
  ({ username, password }: IApiLoginOrSignUpPayload): AppThunk =>
  async (dispatch) => {
    dispatch({ type: LOGIN_ACTIONS.START });
    try {
      const response = await postRequest<
        IApiLoginOrSignUpPayload,
        { jwtToken: string; jwtTokenExpires: number; data: IUserData }
      >({
        url: '/api/auth/login',
        payload: {
          username: username,
          password: password,
        },
      });

      const { jwtToken, jwtTokenExpires, data } = response.data;
      setAuthTokenToCookie(jwtToken, jwtTokenExpires);
      dispatch({ type: LOGIN_ACTIONS.SUCCESS, payload: data });
    } catch (err: any) {
      const error = err as AxiosError;
      dispatch({ type: LOGIN_ACTIONS.FAILED, payload: error.response?.data });
    }
  };

export const signup =
  ({ username, password }: IApiLoginOrSignUpPayload): AppThunk =>
  async (dispatch) => {
    dispatch({ type: SIGNUP_ACTIONS.START });
    try {
      const response = await postRequest<
        IApiLoginOrSignUpPayload,
        { jwtToken: string; jwtTokenExpires: number; data: IUserData }
      >({
        url: '/api/auth/signup',
        payload: {
          username: username,
          password: password,
        },
      });

      const { jwtToken, jwtTokenExpires, data } = response.data;
      setAuthTokenToCookie(jwtToken, jwtTokenExpires);
      dispatch({ type: SIGNUP_ACTIONS.SUCCESS, payload: data });
    } catch (err: any) {
      const error = err as AxiosError;
      dispatch({
        type: SIGNUP_ACTIONS.FAILED,
        payload: error.response?.data,
      });
    }
  };

export const logout = (): AppThunk => async (dispatch) => {
  clearAuthTokenInCookie();
  dispatch({ type: LOGOUT_ACTIONS.SUCCESS });
};

export const verifyToken = (): AppThunk => async (dispatch) => {
  dispatch({ type: VERIFY_TOKEN_ACTIONS.START });
  try {
    const response = await postRequest<never, { jwtToken: string; jwtTokenExpires: number; data: IUserData }>({
      url: '/api/auth/verifyToken',
    });

    const { jwtToken, jwtTokenExpires, data } = response.data;
    setAuthTokenToCookie(jwtToken, jwtTokenExpires);
    dispatch({ type: VERIFY_TOKEN_ACTIONS.SUCCESS, payload: data });
  } catch (err: any) {
    const error = err as AxiosError;
    dispatch({ type: VERIFY_TOKEN_ACTIONS.FAILED, payload: error.response?.data });
  }
};
