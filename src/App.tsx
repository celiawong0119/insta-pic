import { FC, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Container } from '@mui/material';

import PrivateRoute from './components/PrivateRoute';
import LogInOrSignUp from './components/LogInOrSignUp';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { verifyToken } from './store/actions/authActions';
import { getAuthTokenFromCookie } from './libAddons/universal-cookies';
import { RootState } from './store/reducers';

const setAxiosDefault = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
};

setAxiosDefault();

const App: FC = () => {
  const dispatch = useDispatch();
  const { data: user } = useSelector((state: RootState) => state.user);
  const [sortDesc, setSortDesc] = useState<boolean>(true);

  const [path, setPath] = useState<string>('');
  const [isHomePage, setIsHomePage] = useState<boolean>(false);
  const [isProfilePage, setIsProfilePage] = useState<boolean>(false);

  useEffect(() => {
    const jwtToken = getAuthTokenFromCookie();
    if (jwtToken && !user) {
      dispatch(verifyToken());
    }
  }, [dispatch, user]);

  const toggleSort = () => {
    setSortDesc(!sortDesc);
  };

  const togglePage = () => {
    if (path.includes('/home')) {
      setIsHomePage(true);
      setIsProfilePage(false);
    } else if (path.includes('/profile')) {
      setIsHomePage(false);
      setIsProfilePage(true);
    } else {
      setIsHomePage(false);
      setIsProfilePage(false);
    }
  };

  return (
    <Router>
      <Container>
        <Switch>
          <PrivateRoute path='/home'>
            <Home
              sortDesc={sortDesc}
              toggleSort={toggleSort}
              togglePage={togglePage}
              setPath={setPath}
              isHomePage={isHomePage}
              isProfilePage={isProfilePage}
            />
          </PrivateRoute>
          <PrivateRoute path='/profile/:id'>
            <Profile
              sortDesc={sortDesc}
              toggleSort={toggleSort}
              togglePage={togglePage}
              setPath={setPath}
              isHomePage={isHomePage}
              isProfilePage={isProfilePage}
            />
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
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
