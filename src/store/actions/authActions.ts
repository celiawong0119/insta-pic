import axios, { AxiosResponse, AxiosError } from 'axios';

import { AppThunk } from '../../libAddons/redux-thunk';
import { IApiLoginOrSignUpPayload } from './@apiTypes/auth';
import { IUserData } from '../reducers/@dataModals/auth';
import { LOGIN_ACTIONS, SIGNUP_ACTIONS, LOGOUT_ACTIONS } from './authActionTypes';
import { setAuthTokenToCookie, clearAuthTokenInCookie } from '../../libAddons/universal-cookies';

export const login =
  ({ username, password }: IApiLoginOrSignUpPayload): AppThunk =>
  async (dispatch) => {
    dispatch({ type: LOGIN_ACTIONS.START });
    try {
      const response: AxiosResponse<{ jwtToken: string; jwtTokenExpires: number; data: IUserData }> = await axios.post(
        `${axios.defaults.baseURL}/api/auth/login`,
        {
          username: username,
          password: password,
        }
      );

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
      const response: AxiosResponse<{ jwtToken: string; jwtTokenExpires: number; data: IUserData }> = await axios.post(
        `${axios.defaults.baseURL}/api/auth/signup`,
        {
          username: username,
          password: password,
        }
      );

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
