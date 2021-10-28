import { FC, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Container } from '@mui/material';

import PrivateRoute from './components/PrivateRoute';
import LogInOrSignUp from './components/LogInOrSignUp';
import Home from './pages/Home';
import { verifyToken } from './store/actions/authActions';

const setAxiosDefault = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
};

setAxiosDefault();

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken());
  }, []);

  return (
    <Router>
      <Container>
        <Switch>
          <PrivateRoute path='/home'>
            <Home />
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
