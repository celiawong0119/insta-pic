import { FC } from 'react';
import { Box, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';

import PostCreator from './PostCreator';
import Avatar1 from '../assets/images/Avatar1.jpeg';

export const useStyles = makeStyles({
  title: { fontFamily: 'Dancing Script', color: '#6C1D79' },
});

const Header: FC<{ toggleDrawer: () => void }> = ({ toggleDrawer }) => {
  const classes = useStyles();

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
      <h1 className={classes.title}>InstaPic</h1>
      <PostCreator />
      <Box onClick={toggleDrawer} display='flex' alignItems='center'>
        <Avatar alt='example' src={Avatar1} />
      </Box>
    </Box>
  );
};

export default Header;
