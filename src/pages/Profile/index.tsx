import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Avatar, Typography } from '@mui/material';

import Header from '../../components/Header';
import InfiniteScrollComponent from '../../components/InfiniteScrollComponent';
import { getPosts } from '../../store/actions/postActions';
import { useParams } from 'react-router';
import AvatarPlaceHolder from '../../assets/images/AvatarPlaceHolder.jpeg';
import { RootState } from '../../store/reducers';
import { useMediaQuery } from '../../hooks/useMediaQuery';
interface ProfileProps {
  sortDesc: boolean;
  toggleSort: () => void;
}

const Profile: FC<ProfileProps> = ({ sortDesc, toggleSort }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { data: user } = useSelector((state: RootState) => state.user);
  const { id } = useParams<{ id: string }>();
  const isMedium = useMediaQuery('(max-width: 1200px)');
  const isSmall = useMediaQuery('(max-width: 700px)');

  useEffect(() => {
    console.log('post fetch first page');
    dispatch(getPosts({ userId: id, sortByTime: sortDesc ? 'desc' : 'asc' }));
  }, [id, sortDesc, dispatch]);

  return (
    <Box paddingTop={10}>
      <Header sortDesc={sortDesc} toggleSort={toggleSort} />
      {user && location.pathname === `/profile/${user?.id}` ? (
        <Box>
          {isMedium ? (
            <Box>
              {isSmall ? (
                <Box
                  display='flex'
                  alignItems='center'
                  justifyContent='space-between'
                  width={150}
                  position='fixed'
                  top={80}
                  left='3%'
                >
                  <Avatar alt={user.username} src={AvatarPlaceHolder} sx={{ width: 40, height: 40 }} />
                </Box>
              ) : (
                // <Box
                //   display='flex'
                //   alignItems='center'
                //   justifyContent='space-between'
                //   width={150}
                //   position='fixed'
                //   top={80}
                //   left='3%'
                // >
                //   <Avatar alt={user.username} src={AvatarPlaceHolder} sx={{ width: 60, height: 60 }} />
                //   <Box display='flex' alignItems='flex-start' flexDirection='column'>
                //     <Typography variant='h5' component='span'>
                //       {user.username}
                //     </Typography>
                //     <Typography variant='body1' component='span' color='text.secondary'>
                //       {user.posts.length} posts
                //     </Typography>
                //   </Box>
                // </Box>
                // <Box display='flex' justifyContent='center' mb={5}>
                //   <Box display='flex' alignItems='center' justifyContent='space-between' width={150}>
                //     <Avatar alt={user.username} src={AvatarPlaceHolder} sx={{ width: 60, height: 60 }} />
                //     <Box display='flex' alignItems='flex-start' flexDirection='column'>
                //       <Typography variant='h5' component='span'>
                //         {user.username}
                //       </Typography>
                //       <Typography variant='body1' component='span' color='text.secondary'>
                //         {user.posts.length} posts
                //       </Typography>
                //     </Box>
                //   </Box>
                // </Box>
                <Box></Box>
              )}
            </Box>
          ) : (
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              width={180}
              position='fixed'
              top={80}
              left='5%'
            >
              <Avatar alt={user.username} src={AvatarPlaceHolder} sx={{ width: 80, height: 80 }} />
              <Box display='flex' alignItems='flex-start' flexDirection='column'>
                <Typography variant='h4' component='span'>
                  {user.username}
                </Typography>
                <Typography variant='body1' component='span' color='text.secondary'>
                  {user.posts.length} posts
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      ) : null}
      <InfiniteScrollComponent currentUserId={id} sortDesc={sortDesc} />
    </Box>
  );
};

export default Profile;

// {user ? (<Box>{isMedium ? (<Box>{isSmall ? (<Box></Box>) : (<Box></Box>)}</Box>) : <Box></Box>}</Box>) : null}
