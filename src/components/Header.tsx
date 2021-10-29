import { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Home, HomeOutlined, AccountCircle, AccountCircleOutlined } from '@mui/icons-material';

import PostCreator from './PostCreator';
import PopUpMenu from './PopUpMenu';

interface HeaderProps {
  sortDesc: boolean;
  toggleSort: () => void;
  togglePage: () => void;
  isHomePage: boolean;
  isProfilePage: boolean;
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

const Header: FC<HeaderProps> = ({ sortDesc, toggleSort, togglePage, isHomePage, isProfilePage }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const onProfileIconClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onMenuClose = () => {
    setAnchorEl(null);
  };

  const onHomeClick = () => {
    history.push('/home');
    togglePage();
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
      <Box display='flex' width={100} justifyContent='space-between'>
        <IconButton onClick={onHomeClick} color='secondary' component='span' className={classes.iconButton}>
          {isHomePage ? <Home /> : <HomeOutlined />}
        </IconButton>
        <PostCreator />
        <IconButton onClick={onProfileIconClick} color='secondary' component='span' className={classes.iconButton}>
          {isProfilePage ? <AccountCircle /> : <AccountCircleOutlined />}
        </IconButton>
      </Box>
      <PopUpMenu
        anchorEl={anchorEl}
        open={open}
        onMenuClose={onMenuClose}
        sortDesc={sortDesc}
        toggleSort={toggleSort}
        togglePage={togglePage}
      />
    </Box>
  );
};

export default Header;
