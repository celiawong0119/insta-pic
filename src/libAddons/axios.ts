import axios, { AxiosResponse } from 'axios';

import { getAuthTokenFromCookie } from './universal-cookies';

export async function postRequest<Payload, Response>({
  url,
  payload,
}: {
  url: string;
  payload?: Payload;
}): Promise<AxiosResponse<Response>> {
  const jwtToken = getAuthTokenFromCookie();

  return await axios.post(
    `${axios.defaults.baseURL}${url}`,
    payload,
    jwtToken ? { headers: { 'x-auth-token': jwtToken } } : {}
  );
}
