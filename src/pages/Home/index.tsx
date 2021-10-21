import { FC } from 'react';
import { Box } from '@mui/material';

import CreatePost from '../../components/CreatePost';

const Home: FC = () => {
  return (
    <Box>
      <CreatePost />
    </Box>
  );
};

export default Home;
