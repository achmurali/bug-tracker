import { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Menu, IconButton, MenuItem } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import RedoIcon from '@material-ui/icons/Redo';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';

import { deleteBug, editBug } from '../controllers/bugs';
import ConfirmDialog from '../components/confirmDialog';
import FormDialog from '../components/formDialog';
import BugForm from './bugsForm';
import NoteForm from './noteForm';

interface BugsMenuProps {
  projectId: string;
  bugId: string;
  currentData: any;
  isResolved: boolean;
  iconSize?: 'small' | 'default' | 'large';
}

const BugsMenu: React.FC<BugsMenuProps> = ({
  projectId,
  bugId,
  currentData,
  isResolved,
  iconSize,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDeleteBug = () => {
    dispatch(deleteBug(projectId, bugId, history));
  };

  const handleCloseBug = () => {
    dispatch(editBug(projectId, bugId, {...currentData,status:'Close'}));
  };

  const handleReopenBug = () => {
    dispatch(editBug(projectId, bugId,  {...currentData,status:'Open'}));
  };

  return (
    <div>
      <IconButton onClick={handleOpenMenu} size="small">
        <MoreHorizIcon color="primary" fontSize={iconSize || 'large'} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        marginThreshold={8}
        elevation={4}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem
          onClick={handleCloseMenu}
          component={RouterLink}
          to={`/projects/${projectId}/bugs/${bugId}`}
        >
          <OpenInNewIcon style={{ marginRight: '10px' }} />
          Bug Details
        </MenuItem>
        {isResolved ? (
          <ConfirmDialog
            title="Re-open the Bug"
            contentText="Are you sure you want to re-open the bug?"
            actionBtnText="Re-open Bug"
            triggerBtn={{
              type: 'menu',
              text: 'Re-open Bug',
              icon: RedoIcon,
              iconStyle: { marginRight: '10px' },
              closeMenu: handleCloseMenu,
            }}
            actionFunc={handleReopenBug}
          />
        ) : (
          <ConfirmDialog
            title="Close the Bug"
            contentText="Are you sure you want to close the bug?"
            actionBtnText="Close Bug"
            triggerBtn={{
              type: 'menu',
              text: 'Close Bug',
              icon: DoneOutlineIcon,
              iconStyle: { marginRight: '10px' },
              closeMenu: handleCloseMenu,
            }}
            actionFunc={handleCloseBug}
          />
        )}
        <FormDialog
          triggerBtn={{
            type: 'menu',
            text: 'Update Bug',
            icon: EditOutlinedIcon,
            iconStyle: { marginRight: '10px' },
            closeMenu: handleCloseMenu,
          }}
          title="Edit the bug details"
        >
          <BugForm
            isEditMode={true}
            projectId={projectId}
            bugId={bugId}
            currentData={currentData}
          />
        </FormDialog>
        <ConfirmDialog
          title="Confirm Delete Bug"
          contentText="Are you sure you want to permanently delete the bug?"
          actionBtnText="Delete Bug"
          triggerBtn={{
            type: 'menu',
            text: 'Delete Bug',
            icon: DeleteOutlineIcon,
            iconStyle: { marginRight: '10px' },
            closeMenu: handleCloseMenu,
          }}
          actionFunc={handleDeleteBug}
        />
        <FormDialog
          triggerBtn={{
            type: 'menu',
            text: 'Leave A Note',
            icon: CommentOutlinedIcon,
            iconStyle: { marginRight: '10px' },
            closeMenu: handleCloseMenu,
          }}
          title="Post a note"
        >
          <NoteForm isEditMode={false} projectId={projectId} bugId={bugId} />
        </FormDialog>
      </Menu>
    </div>
  );
};

export default BugsMenu;
