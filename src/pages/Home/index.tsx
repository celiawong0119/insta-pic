import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';

import Header from '../../components/Header';
import Post from '../../components/Post';
import { RootState } from '../../store/reducers';
import { getPosts } from '../../store/actions/postActions';

interface HomeProps {
  sortDesc: boolean;
  toggleSort: () => void;
  togglePage: () => void;
  setPath: (path: string) => void;
  isHomePage: boolean;
  isProfilePage: boolean;
}

const Home: FC<HomeProps> = ({ sortDesc, toggleSort, togglePage, setPath, isHomePage, isProfilePage }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    togglePage();
  }, [togglePage, location.pathname]);

  useEffect(() => {
    dispatch(getPosts({ sortByTime: sortDesc ? 'desc' : 'asc' }));
  }, [sortDesc, dispatch]);

  useEffect(() => {
    setPath(location.pathname);
    console.log(location.pathname);
  }, [location, setPath]);

  return (
    <Box paddingTop={10}>
      <Header
        sortDesc={sortDesc}
        toggleSort={toggleSort}
        togglePage={togglePage}
        isHomePage={isHomePage}
        isProfilePage={isProfilePage}
      />
      {data.length > 0 && data.map((post) => <Post key={post.id} data={post} />)}
    </Box>
  );
};

export default Home;
