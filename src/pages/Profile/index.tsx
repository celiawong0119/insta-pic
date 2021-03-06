import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';

import Header from '../../components/header/Header';
import InfiniteScrollComponent from '../../components/infiniteScroller/InfiniteScrollComponent';
import { getPosts } from '../../store/post/postActions';
import { useParams } from 'react-router';
interface ProfileProps {
  sortDesc: boolean;
  toggleSort: () => void;
}

const Profile: FC<ProfileProps> = ({ sortDesc, toggleSort }) => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
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
