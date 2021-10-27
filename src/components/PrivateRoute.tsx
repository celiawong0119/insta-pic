import { FC, useEffect, useCallback } from 'react';
import { Route, useHistory } from 'react-router-dom';

import { cookies, getAuthTokenFromCookie } from '../libAddons/universal-cookies';

const PrivateRoute: FC<{
  path: string;
}> = ({ children, path }) => {
  const history = useHistory();

  const onCookieChange = () => {
    const jwtToken = getAuthTokenFromCookie();
    if (!jwtToken) {
      history.push('/login');
    }
  };

  const memoizedCallback = useCallback(onCookieChange, [onCookieChange]);

  useEffect(() => {
    cookies.addChangeListener(memoizedCallback);
    return () => cookies.removeChangeListener(memoizedCallback);
  }, [memoizedCallback]);

  return <Route path={path}>{children}</Route>;
};

export default PrivateRoute;
