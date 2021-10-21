import { Container } from '@mui/material';

import LogInOrSignUp from './components/LogInOrSignUp';
import Home from './pages/Home';

function App() {
  return (
    <div style={{ backgroundColor: '#F6F6F6', height: '100vh' }}>
      <Container>
        {/* <LogInOrSignUp buttonLabel='Log In' linkText='Sign Up' linkDesc='Don"t have an account?' /> */}
        {/* <LogInOrSignUp
        buttonLabel='Sign Up'
        linkText='Log In'
        linkDesc='Have an account?'
        someText='Sign up to see photos from your friends.'
      /> */}
        <Home />
      </Container>
    </div>
  );
}

export default App;
