import { FC, useState } from 'react';
import { Box, Avatar, TextField, Dialog, DialogTitle } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Avatar1 from '../assets/images/Avatar1.jpeg';

export const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    minWidth: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
    height: 60,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
    boxSizing: 'border-box',
  },
  textWrapper: {
    backgroundColor: '#EFF2F5',
    borderRadius: 50,
    width: '80%',
    minWidth: 230,
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
}));

interface IDialog {
  open: boolean;
  onClose: () => void;
}

const CreatePostDialog: FC<IDialog> = ({ open, onClose }) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Create post</DialogTitle>
      <Box display='flex' flexGrow={1} height='1px' bgcolor='#C0C0C0' />
      <TextField
        hiddenLabel
        variant='standard'
        multiline
        rows={4}
        placeholder="What's on your mind, Celia?"
        // className={classes.inputBox}
        // color='secondary'
        // InputLabelProps={{
        //   className: classes.placeholder,
        // }}
        //       value={name}
        //   onChange={handleChange}
      />
    </Dialog>
  );
};

const CreatePost: FC = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const onClickOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Box display='flex' justifyContent='center' alignItems='center'>
      <Box className={classes.wrapper}>
        <Avatar alt='example' src={Avatar1} />
        <Box onClick={onClickOpen} className={classes.textWrapper}>
          <p className={classes.text}>What's on your mind, Celia?</p>
          {/* when the width become 320 (<<min):  <p className={classes.text}>What's on your mind?</p> */}
        </Box>
        <CreatePostDialog open={open} onClose={onClose} />
      </Box>
    </Box>
  );
};

export default CreatePost;
