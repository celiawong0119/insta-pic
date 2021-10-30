import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';

import Header from '../../components/Header';
import Post from '../../components/Post';
import InfiniteScrollComponent from '../../components/InfiniteScrollComponent';
import { RootState } from '../../store/reducers';
import { getPosts } from '../../store/actions/postActions';

interface HomeProps {
  sortDesc: boolean;
  toggleSort: () => void;
}

const Home: FC<HomeProps> = ({ sortDesc, toggleSort }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts({ sortByTime: sortDesc ? 'desc' : 'asc' }));
  }, [sortDesc, dispatch]);

  return (
    <Box paddingTop={10}>
      <Header sortDesc={sortDesc} toggleSort={toggleSort} />
      <InfiniteScrollComponent sortDesc={sortDesc} />
    </Box>
  );
};

export default Home;
