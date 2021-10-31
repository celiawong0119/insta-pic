import { FC, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Home, HomeOutlined, AccountCircle, AccountCircleOutlined } from '@mui/icons-material';

import PostCreator from './PostCreator';
import PopUpMenu from './PopUpMenu';
import { RootState } from '../store/reducers';

interface HeaderProps {
  sortDesc: boolean;
  toggleSort: () => void;
}

export const useStyles = makeStyles({
  title: { fontFamily: 'Dancing Script', fontSize: 24, color: '#6C1D79', cursor: 'pointer' },
  iconButton: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
});

const Header: FC<HeaderProps> = ({ sortDesc, toggleSort }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data: user } = useSelector((state: RootState) => state.user);
  const { data: posts } = useSelector((state: RootState) => state.posts);
  const open = Boolean(anchorEl);

  const onProfileIconClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onMenuClose = () => {
    setAnchorEl(null);
  };

  const onHomeClick = () => {
    history.push('/home');
  };

  const findPathUserId = (): string | undefined => {
    if (location.pathname.includes('/profile/')) {
      const pathUserId = location.pathname.replace('/profile/', '');
      const found = posts.find((i) => i.id === parseInt(pathUserId));
      return found?.author.name;
    }
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
      zIndex={1000}
    >
      <h1 onClick={onHomeClick} className={classes.title}>
        InstaPic
      </h1>
      {location.pathname.includes('/profile/') ? (
        <Typography variant='body1' component='span' color='text.secondary'>
          {findPathUserId()}
        </Typography>
      ) : null}
      <Box display='flex' width={100} justifyContent='space-between'>
        <IconButton onClick={onHomeClick} color='secondary' component='span' className={classes.iconButton}>
          {location.pathname === '/home' ? <Home /> : <HomeOutlined />}
        </IconButton>
        <PostCreator sortDesc={sortDesc} />
        <IconButton onClick={onProfileIconClick} color='secondary' component='span' className={classes.iconButton}>
          {location.pathname === `/profile/${user?.id}` ? <AccountCircle /> : <AccountCircleOutlined />}
        </IconButton>
      </Box>
      <PopUpMenu
        anchorEl={anchorEl}
        open={open}
        onMenuClose={onMenuClose}
        sortDesc={sortDesc}
        toggleSort={toggleSort}
      />
    </Box>
  );
};

export default Header;
