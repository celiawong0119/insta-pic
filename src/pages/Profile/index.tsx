import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';

import Header from '../../components/Header';
import InfiniteScrollComponent from '../../components/InfiniteScrollComponent';
import { getPosts } from '../../store/actions/postActions';
import { useParams } from 'react-router';
interface ProfileProps {
  sortDesc: boolean;
  toggleSort: () => void;
}

const Profile: FC<ProfileProps> = ({ sortDesc, toggleSort }) => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    console.log('post fetch first page');
    dispatch(getPosts({ userId: id, sortByTime: sortDesc ? 'desc' : 'asc' }));
  }, [id, sortDesc, dispatch]);

  return (
    <Box paddingTop={10}>
      <Header sortDesc={sortDesc} toggleSort={toggleSort} />
      <InfiniteScrollComponent currentUserId={id} sortDesc={sortDesc} />
    </Box>
  );
};

export default Profile;

// {user ? (<Box>{isMedium ? (<Box>{isSmall ? (<Box></Box>) : (<Box></Box>)}</Box>) : <Box></Box>}</Box>) : null}
