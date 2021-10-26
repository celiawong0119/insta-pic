import { FC } from 'react';
import { Box } from '@mui/material';

import Header from '../../components/Header';
import Posts from '../../components/Posts';

const Home: FC = () => {
  return (
    <Box paddingTop={10}>
      <Header />
      <div>home</div>
      {[1, 2].map((id) => (
        <Posts key={id} id={id} />
      ))}
    </Box>
  );
};

export default Home;
