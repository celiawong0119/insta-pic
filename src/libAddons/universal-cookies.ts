import Cookies from 'universal-cookie';

export const cookies = new Cookies();

// expiryDate in unix timestamp format (need to * 1000)
export const setAuthTokenToCookie = (token: string, expiryDate: number) => {
  cookies.set('jwtToken', token, {
    path: '/',
    expires: new Date(expiryDate * 1000),
  });
};

export const getAuthTokenFromCookie = (): string | undefined => {
  return cookies.get('jwtToken');
};

export const clearAuthTokenInCookie = (): void => {
  cookies.remove('jwtToken', { path: '/' });
};
