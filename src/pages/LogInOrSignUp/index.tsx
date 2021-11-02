import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { login, signup } from '../../store/user/userActions';
import { RootState } from '../../store';
import { getAuthTokenFromCookie } from '../../libAddons/universal-cookies';

interface IProps {
  variant: 'login' | 'signup';
}

export const useStyles = makeStyles({
  title: { fontSize: 50, fontFamily: 'Dancing Script', color: '#6C1D79' },
  inputBox: {
    width: '30%',
    marginTop: 10,
  },
  placeholder: {
    color: '#D5D5D5',
  },
  submitButton: {
    width: '30%',
    color: '#FFFFFF !important',
    fontWeight: 700,
    fontSize: 16,
    marginTop: 20,
    '&.Mui-disabled': {
      backgroundColor: '#EBA1F8',
    },
  },
  disabledButton: {
    backgroundColor: '#D783E5',
  },
  goToButton: {
    color: '#9C27B0',
    fontWeight: 700,
    cursor: 'pointer',
  },
  someText: {
    color: '#6A6A6A',
    marginTop: 0,
  },
});

const LogInOrSignUp: FC<IProps> = ({ variant }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { data, loading, error } = useSelector((state: RootState) => state.user);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (data || getAuthTokenFromCookie()) {
      history.push('/home');
    }
  }, [data, history]);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onClickLoginOrSignup = () => {
    variant === 'login'
      ? dispatch(login({ username: username, password: password }))
      : dispatch(signup({ username: username, password: password }));
  };

  const onEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onClickLoginOrSignup();
    }
  };

  const onPathClick = () => {
    variant === 'login' ? history.push('/signup') : history.push('/login');
  };

  return (
    <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='85vh'>
      <h1 className={classes.title}>InstaPic</h1>
      {variant === 'signup' && <h4 className={classes.someText}>Sign up to see photos from your friends.</h4>}
      <TextField
        label='Username'
        variant='outlined'
        className={classes.inputBox}
        color='secondary'
        InputLabelProps={{
          className: classes.placeholder,
        }}
        value={username}
        onChange={onUsernameChange}
      />
      <TextField
        label='Password'
        type='password'
        onKeyPress={onEnter}
        variant='outlined'
        className={classes.inputBox}
        color='secondary'
        InputLabelProps={{
          className: classes.placeholder,
        }}
        value={password}
        onChange={onPasswordChange}
      />
      <Button
        onClick={onClickLoginOrSignup}
        disabled={!password || loading}
        variant='contained'
        className={classes.submitButton}
        color='secondary'
      >
        {variant === 'login' ? 'Log In' : 'Sign Up'}
      </Button>
      <Box display='flex' width='30%' alignItems='center' mt={4} mb={3}>
        <Box display='flex' flexGrow={1} height='1px' bgcolor='#C0C0C0' />
        <Box display='flex' flexGrow={0} m='0 15px' color='#8A8A8A' fontWeight={700}>
          OR
        </Box>
        <Box display='flex' flexGrow={1} height='1px' bgcolor='#C0C0C0' />
      </Box>
      <Box>
        <p style={{ color: '#6D6D6D' }}>
          {variant === 'login' ? "Don't have an account" : 'Have an account?'}{' '}
          <span onClick={onPathClick} className={classes.goToButton}>
            {variant === 'login' ? 'Sign Up' : 'Log In'}
          </span>
        </p>
      </Box>
    </Box>
  );
};

export default LogInOrSignUp;
