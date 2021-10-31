import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, Dialog, DialogTitle, IconButton, styled } from '@mui/material';
import { makeStyles } from '@mui/styles';
import UploadIcon from '@mui/icons-material/Upload';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';

import { createPost } from '../store/actions/postActions';
import { RootState } from '../store/reducers';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles({
  iconButton: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  dialogTitle: {
    textAlign: 'center',
  },
  dialogTextArea: {
    padding: '10px 5%',
  },
  dialogImageWrapper: {
    border: '1px solid #C0C0C0',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
    width: '95%',
  },
  dialogImage: {
    width: '100%',
    borderRadius: 5,
  },
  buttonWrapper: {
    width: '100%',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
  },
  uploadButton: {
    color: '#CF95D8',
    textTransform: 'none',
    borderRadius: 10,
    width: '90%',
  },
  postButton: {
    textTransform: 'none',
    marginTop: 20,
    borderRadius: 0,
  },
});

interface IDialog {
  open: boolean;
  onClose: () => void;
  sortDesc: boolean;
}

const Input = styled('input')({
  display: 'none',
});

const CreatePostDialog: FC<IDialog> = ({ open, onClose, sortDesc }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading } = useSelector((state: RootState) => state.posts);
  const { data: user } = useSelector((state: RootState) => state.user);

  const [caption, setCaption] = useState<string>('');
  const [imageName, setImageName] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);

  const onCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(e.target.value);
  };

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files);
      if (Array.from(e.target.files).length > 1) {
        e.preventDefault();
        alert('Cannot upload files more than 1');
        return;
      } else if (e.target.files[0].size > 3145728) {
        alert('File should not be larger than 3MB!');
        return;
      }
      setImageName(URL.createObjectURL(e.target.files[0]));
      setImageFile(e.target.files[0]);
    }
  };

  const handleClose = () => {
    onClose();
    setCaption('');
    setImageName('');
    setImageFile(undefined);
  };

  const onPostClick = () => {
    if (user && imageFile && caption) {
      const isHomePage = location.pathname === '/home';
      const isMyProfile = location.pathname === `/profile/${user.id}`;
      const needRefreshAfterCreatePost = isHomePage || isMyProfile;
      dispatch(
        createPost({
          userId: user.id,
          imageFile: imageFile,
          caption: caption,
          refreshOptions: needRefreshAfterCreatePost
            ? { userId: isMyProfile ? user.id : undefined, sortByTime: sortDesc ? 'desc' : 'asc' }
            : undefined,
        })
      );
      handleClose();
    } else {
      alert('Create post failed');
      handleClose();
    }
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth='xs'>
      <DialogTitle className={classes.dialogTitle}>Create post</DialogTitle>
      <Box display='flex' flexGrow={1} height='1px' bgcolor='#C0C0C0' />
      <Box width='100%' height={370} maxHeight={800} overflow='scroll' display='flex' flexDirection='column'>
        <TextField
          hiddenLabel
          variant='standard'
          multiline
          rows={3}
          placeholder="What's on your mind?"
          className={classes.dialogTextArea}
          InputProps={{ disableUnderline: true }}
          value={caption}
          onChange={onCaptionChange}
        />
        {imageName && (
          <Box className={classes.dialogImageWrapper}>
            <img src={imageName} alt='uploaded item' className={classes.dialogImage} />
          </Box>
        )}
      </Box>
      <Box display='flex' justifyContent='center' mt={2}>
        <label htmlFor='contained-button-file' className={classes.buttonWrapper}>
          <Input accept='image/*' id='contained-button-file' multiple type='file' onChange={uploadImage} />
          <Button
            variant='outlined'
            component='span'
            color='secondary'
            endIcon={<UploadIcon />}
            className={classes.uploadButton}
          >
            Add an image to your post
          </Button>
        </label>
      </Box>
      <Button
        onClick={onPostClick}
        disabled={!imageName || !caption || loading}
        variant='contained'
        color='secondary'
        className={classes.postButton}
      >
        Post
      </Button>
    </Dialog>
  );
};

const PostCreator: FC<{ sortDesc: boolean }> = ({ sortDesc }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  // const isMobile = useMediaQuery('(max-width: 550px)');

  const onClickOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Box onClick={onClickOpen}>
        <IconButton color='secondary' component='span' className={classes.iconButton}>
          {open ? <AddAPhotoIcon /> : <AddAPhotoOutlinedIcon />}
        </IconButton>
      </Box>
      <CreatePostDialog open={open} onClose={onClose} sortDesc={sortDesc} />
    </Box>
  );
};

export default PostCreator;
