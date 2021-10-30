import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AccountCircleOutlined, Logout, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

import { logout } from '../store/actions/authActions';
import { RootState } from '../store/reducers';

interface MenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onMenuClose: () => void;
  sortDesc: boolean;
  toggleSort: () => void;
}

export const useStyles = makeStyles({});

const PopUpMenu: FC<MenuProps> = ({ anchorEl, open, onMenuClose, sortDesc, toggleSort }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { data: user } = useSelector((state: RootState) => state.user);

  const onProfileClick = () => {
    history.push(`/profile/${user?.id}`);
  };

  const onLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onMenuClose}
      onClick={onMenuClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 15,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <Box onClick={toggleSort}>
        {sortDesc ? (
          <MenuItem>
            <ListItemIcon>
              <KeyboardArrowUp />
            </ListItemIcon>
            Date followed: Earliest
          </MenuItem>
        ) : (
          <MenuItem>
            <ListItemIcon>
              <KeyboardArrowDown />
            </ListItemIcon>
            Date followed: Latest
          </MenuItem>
        )}
      </Box>
      <MenuItem onClick={onProfileClick}>
        <ListItemIcon>
          <AccountCircleOutlined fontSize='small' />
        </ListItemIcon>
        My Profile
      </MenuItem>
      <Divider />
      <MenuItem onClick={onLogoutClick}>
        <ListItemIcon>
          <Logout fontSize='small' />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default PopUpMenu;
