import { FC, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Container } from '@mui/material';

import PrivateRoute from './components/PrivateRoute';
import LogInOrSignUp from './pages/LogInOrSignUp';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { verifyToken } from './store/user/userActions';
import { getAuthTokenFromCookie } from './libAddons/universal-cookies';
import { RootState } from './store';

const setAxiosDefault = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
};

setAxiosDefault();

const App: FC = () => {
  const dispatch = useDispatch();
  const { data: user } = useSelector((state: RootState) => state.user);
  const [sortDesc, setSortDesc] = useState<boolean>(true);

  useEffect(() => {
    const jwtToken = getAuthTokenFromCookie();
    if (jwtToken && !user) {
      dispatch(verifyToken());
    }
  }, [dispatch, user]);

  const toggleSort = () => {
    setSortDesc(!sortDesc);
  };

  return (
    <Router>
      <Container>
        <Switch>
          <PrivateRoute path='/home'>
            <Home sortDesc={sortDesc} toggleSort={toggleSort} />
          </PrivateRoute>
          <PrivateRoute path='/profile/:id'>
            <Profile sortDesc={sortDesc} toggleSort={toggleSort} />
          </PrivateRoute>
          <Route path='/signup'>
            <LogInOrSignUp variant='signup' />
          </Route>
          <Route path='/login'>
            <LogInOrSignUp variant='login' />
          </Route>
          <Route path='/'>
            <Redirect to='/login' />
          </Route>
          <Redirect from='*' to='/' />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
