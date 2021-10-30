import { FC, useEffect, memo } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Avatar, Card, CardHeader, CardMedia, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LazyLoad from 'react-lazyload';

import Truncate from './Truncate';
import { IPostData } from '../store/reducers/@dataModals/post';
import AvatarPlaceHolder from '../assets/images/AvatarPlaceHolder.jpeg';

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

const Post: FC<{ data: IPostData }> = memo(({ data }) => {
  const classes = useStyles();
  const history = useHistory();
  const { id, imageName, caption, createdDate, author } = data;

  const onNameClick = () => {
    history.push(`/profile/${author.userId}`);
  };

  useEffect(() => {
    console.log(data.id, 'rerendered');
  });

  return (
    <Box display='flex' justifyContent='center' alignItems='center' mb={5}>
      <Box width='45%' minWidth={300} maxWidth={600}>
        <Card>
          <CardHeader
            avatar={<Avatar alt='example' src={AvatarPlaceHolder} />}
            title={author.name}
            onClick={onNameClick}
            style={{ cursor: 'pointer' }}
            titleTypographyProps={{ className: classes.userName }}
          />
          <LazyLoad>
            <CardMedia
              component='img'
              width='100%'
              image={`${process.env.REACT_APP_API}/${imageName}`}
              alt='Post image'
            />
          </LazyLoad>
          <CardContent className={classes.contentWrapper}>
            <Typography variant='body2' component='span'>
              <Truncate id={id} author={author.name} text={caption} />
            </Typography>
            <Box mt={1}>
              <Typography variant='caption' component={'span'} color='text.secondary'>
                {createdDate}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
});

export default Post;
