import { FC, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';

import { getAuthTokenFromCookie } from '../libAddons/universal-cookies';

const PrivateRoute: FC<{
  path: string;
}> = ({ children, path }) => {
  const jwtToken = getAuthTokenFromCookie();
  const history = useHistory();

  useEffect(() => {
    if (!jwtToken) {
      history.push('/login');
    }
  }, [jwtToken, history]);

  return <Route path={path}>{jwtToken ? children : null}</Route>;
};

export default PrivateRoute;
