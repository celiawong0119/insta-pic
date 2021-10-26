import { FC } from 'react';
import { Box, Avatar, Card, CardHeader, CardMedia, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Truncate from './Truncate';
import Avatar1 from '../assets/images/Avatar1.jpeg';

export const useStyles = makeStyles({
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  userName: {
    fontWeight: 700,
    marginRight: 10,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
});

const Posts: FC<{ id: number }> = ({ id }) => {
  const classes = useStyles();

  return (
    <Box display='flex' justifyContent='center' alignItems='center' mb={5}>
      <Box width='45%' minWidth={300} maxWidth={600}>
        <Card>
          <CardHeader
            avatar={<Avatar alt='example' src={Avatar1} />}
            title='Celia'
            titleTypographyProps={{ className: classes.userName }}
          />
          <CardMedia component='img' width='100%' image={Avatar1} alt='example' />
          <CardContent className={classes.contentWrapper}>
            <Typography variant='body2' component='span'>
              <Truncate
                id={id}
                author='Celia'
                text='This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.'
              />
            </Typography>
            <Box mt={1}>
              <Typography variant='caption' component={'span'} color='text.secondary'>
                23 Oct 2021
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Posts;
