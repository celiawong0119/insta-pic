import { FC, useState } from 'react';
import { Box, TextField, Button, Dialog, DialogTitle, IconButton, styled } from '@mui/material';
import { makeStyles } from '@mui/styles';
import UploadIcon from '@mui/icons-material/Upload';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import { useMediaQuery } from '../hooks/useMediaQuery';

const useStyles = makeStyles({
  textWrapper: {
    backgroundColor: '#EFF2F5',
    borderRadius: 50,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    marginLeft: 10,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#EBEBEC',
    },
  },
  text: {
    color: '#8A8A8A',
    marginLeft: 20,
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
}

const Input = styled('input')({
  display: 'none',
});

const CreatePostDialog: FC<IDialog> = ({ open, onClose }) => {
  const classes = useStyles();

  const [caption, setCaption] = useState('');
  const [image, setImage] = useState('');

  const onCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(e.target.value);
  };

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (Array.from(e.target.files).length > 1) {
        e.preventDefault();
        alert(`Cannot upload files more than 1`);
        return;
      }
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth='xs'>
      <DialogTitle className={classes.dialogTitle}>Create post</DialogTitle>
      <Box display='flex' flexGrow={1} height='1px' bgcolor='#C0C0C0' />
      <Box width='100%' height={370} maxHeight={800} overflow='scroll' display='flex' flexDirection='column'>
        <TextField
          hiddenLabel
          variant='standard'
          multiline
          rows={3}
          placeholder="What's on your mind, Celia?"
          className={classes.dialogTextArea}
          InputProps={{ disableUnderline: true }}
          value={caption}
          onChange={onCaptionChange}
        />
        {image && (
          <Box className={classes.dialogImageWrapper}>
            <img src={image} alt='uploaded item' className={classes.dialogImage} />
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
      <Button variant='contained' color='secondary' className={classes.postButton}>
        Post
      </Button>
    </Dialog>
  );
};

const CreatePost: FC = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const isMobile = useMediaQuery('(max-width: 550px)');

  const onClickOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {isMobile ? (
        <Box>
          <Box onClick={onClickOpen}>
            <IconButton color='secondary' size='small'>
              <AddAPhotoIcon />
            </IconButton>
          </Box>
          <CreatePostDialog open={open} onClose={onClose} />
        </Box>
      ) : (
        <Box width='30%' minWidth={250}>
          <Box onClick={onClickOpen} className={classes.textWrapper}>
            <p className={classes.text}>What's on your mind, Celia?</p>
          </Box>
          <CreatePostDialog open={open} onClose={onClose} />
        </Box>
      )}
    </div>
  );
};

export default CreatePost;
