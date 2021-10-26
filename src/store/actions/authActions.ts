import axios, { AxiosResponse } from 'axios';

import { IApiLoginOrSignUpPayload } from './@apiTypes/auth';
import { AppThunk } from '../../libAddons/redux-thunk';
import { LOGIN_ACTIONS } from './authActionTypes';
import { setAuthTokenToCookie } from '../../libAddons/universal-cookies';

export const login =
  ({ username, password }: IApiLoginOrSignUpPayload): AppThunk =>
  async (dispatch) => {
    dispatch({ type: LOGIN_ACTIONS.START });
    try {
      const response: AxiosResponse<{ jwtToken: string; jwtTokenExpires: number }> = await axios.post(
        `${axios.defaults.baseURL}/api/auth/login`,
        {
          username: username,
          password: password,
        }
      );

      const { jwtToken, jwtTokenExpires } = response.data;
      setAuthTokenToCookie(jwtToken, jwtTokenExpires);
      dispatch({ type: LOGIN_ACTIONS.SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: LOGIN_ACTIONS.FAILED });
    }
  };
