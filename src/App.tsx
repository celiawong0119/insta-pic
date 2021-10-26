import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Container } from '@mui/material';

import PrivateRoute from './components/PrivateRoute';
import LogInOrSignUp from './components/LogInOrSignUp';
import Home from './pages/Home';

const setAxiosDefault = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
};

setAxiosDefault();

const App = () => {
  return (
    <Router>
      <Container>
        <Switch>
          <PrivateRoute path='/home'>
            <Home />
          </PrivateRoute>
          <Route path='/signup'>
            <LogInOrSignUp
              buttonLabel='Sign Up'
              linkText='Log In'
              linkDesc='Have an account?'
              someText='Sign up to see photos from your friends.'
              path='/login'
            />
          </Route>
          <Route path='/login'>
            <LogInOrSignUp buttonLabel='Log In' linkText='Sign Up' linkDesc='Don"t have an account?' path='/signup' />
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
