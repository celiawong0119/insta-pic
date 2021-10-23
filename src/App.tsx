import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from '@mui/material';

import LogInOrSignUp from './components/LogInOrSignUp';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Container>
        <Switch>
          <Route path='/login'>
            <LogInOrSignUp buttonLabel='Log In' linkText='Sign Up' linkDesc='Don"t have an account?' path='/signup' />
          </Route>
          <Route path='/signup'>
            <LogInOrSignUp
              buttonLabel='Sign Up'
              linkText='Log In'
              linkDesc='Have an account?'
              someText='Sign up to see photos from your friends.'
              path='/login'
            />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
