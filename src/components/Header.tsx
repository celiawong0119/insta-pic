import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Box, IconButton, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LogoutIcon from '@mui/icons-material/Logout';

import CreatePost from './CreatePost';
import { logout } from '../store/actions/authActions';
import Avatar1 from '../assets/images/Avatar1.jpeg';

export const useStyles = makeStyles({
  title: { fontFamily: 'Dancing Script', color: '#6C1D79' },
});

const Header: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      position='fixed'
      top={0}
      left={0}
      height={60}
      width='100vw'
      padding='0 30px'
      bgcolor='#FFFFFF'
      borderBottom='1px solid #C0C0C0'
      zIndex={10000}
    >
      <h1 className={classes.title}>InstaPic</h1>
      <CreatePost />
      <Box display='flex' alignItems='center' width={100} justifyContent='space-between'>
        <IconButton onClick={onLogoutClick} color='secondary' size='small'>
          <LogoutIcon fontSize='large' />
        </IconButton>
        <Avatar alt='example' src={Avatar1} />
      </Box>
    </Box>
  );
};

export default Header;
