import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Drawer,
  List,
  ListItem,
  IconButton,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
  Button,
} from '@mui/material';

import Header from '../../components/Header';
import Post from '../../components/Post';
import { getPosts } from '../../store/actions/postActions';
import { RootState } from '../../store/reducers';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../../store/actions/authActions';

const Home: FC = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.posts);
  const { data: user } = useSelector((state: RootState) => state.user);
  const [drawerOpen, setDrawer] = useState(false);
  const [sortDesc, setSortDesc] = useState(true);

  const toggleSort = () => {
    setSortDesc(!sortDesc);
  };
  const toggleDrawer = () => {
    setDrawer(!drawerOpen);
  };
  const onLogoutClick = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (user) {
      dispatch(getPosts({ userId: user!.id }));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getPosts({ userId: user.id, sortByTime: sortDesc ? 'desc' : 'asc' }));
    }
  }, [sortDesc, user, dispatch]);

  return (
    <Box paddingTop={10}>
      <React.Fragment>
        <Drawer anchor='left' open={drawerOpen} onClose={toggleDrawer}>
          <List>
            <ListItem>
              <Box display='flex' flexDirection='column'>
                <Typography fontWeight={700}>Sort by Time</Typography>
                <Stack direction='row' spacing={1} alignItems='center'>
                  <Typography>Asc</Typography>
                  <Switch defaultChecked color='secondary' onChange={toggleSort} value={sortDesc} />
                  <Typography>Desc</Typography>
                </Stack>
              </Box>
            </ListItem>
            <ListItem button>
              <Button color='secondary' onClick={onLogoutClick} startIcon={<LogoutIcon />} variant='contained'>
                Logout
              </Button>
            </ListItem>
          </List>
        </Drawer>
      </React.Fragment>
      <Header toggleDrawer={toggleDrawer} />
      {data.length > 0 && data.map((post) => <Post key={post.id} data={post} />)}
    </Box>
  );
};

export default Home;
