import { FC, memo } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Avatar, Card, CardHeader, CardMedia, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LazyLoad from 'react-lazyload';

import Truncate from './Truncate';
import { PostData } from '../../store/post/postModal';
import AvatarPlaceHolder from '../../assets/images/AvatarPlaceHolder.jpeg';

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

const Post: FC<{ data: PostData }> = memo(({ data }) => {
  const classes = useStyles();
  const history = useHistory();
  const { id, imageName, caption, createdTime, author } = data;

  const t = new Date(createdTime * 1000);
  const formattedDatetime = new Intl.DateTimeFormat('zh-HK', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(t);

  const onNameClick = () => {
    history.push(`/profile/${author.userId}`);
  };

  return (
    <Box display='flex' justifyContent='center' alignItems='center' mb={5}>
      <Box width='45%' minWidth={300} maxWidth={600}>
        <Card>
          <CardHeader
            avatar={<Avatar alt='post author' src={AvatarPlaceHolder} />}
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
              <Typography variant='caption' component='span' color='text.secondary'>
                {formattedDatetime}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
});

export default Post;
