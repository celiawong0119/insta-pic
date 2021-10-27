import axios, { AxiosResponse, AxiosError } from 'axios';
import { IApiLoginOrSignUpPayload } from './@apiTypes/auth';
import { AppThunk } from '../../libAddons/redux-thunk';
import { LOGIN_ACTIONS, SIGNUP_ACTIONS } from './authActionTypes';
import { setAuthTokenToCookie } from '../../libAddons/universal-cookies';
import { IUserData } from '../reducers/@dataModals/auth';

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
