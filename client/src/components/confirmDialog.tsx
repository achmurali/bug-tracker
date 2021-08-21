import { useState } from 'react';
import {
  Button,
  IconButton,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  makeStyles
} from '@material-ui/core';

import { TriggerButtonTypes } from '../models/buttons';

const useDialogStyles = makeStyles(
    (theme) => ({
      dialogWrapper: {
        paddingBottom: 20,
        overflow: 'hidden',
        [theme.breakpoints.down('xs')]: {
          padding: 0,
        },
      },
      fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        zIndex: 1000,
      },
      roundIconButton: {
        minWidth: 0,
        padding: '0.65em',
        borderRadius: '2em',
      }
    }),
    { index: 1 }
  );

const ConfirmDialog: React.FC<{
  title: string;
  contentText: string;
  actionBtnText: string;
  triggerBtn: TriggerButtonTypes;
  actionFunc: () => void;
}> = ({ title, contentText, actionBtnText, triggerBtn, actionFunc }) => {
  const classes = useDialogStyles();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
    triggerBtn.type === 'menu' && triggerBtn.closeMenu();
  };

  const handleConfirmedAction = () => {
    actionFunc();
    handleDialogClose();
  };

  const triggerButton = () => {
    if (triggerBtn.type === 'icon') {
      return (
        <IconButton
          color={triggerBtn.color || 'primary'}
          onClick={handleDialogOpen}
          size={triggerBtn.size || 'medium'}
          className={triggerBtn.className}
          style={triggerBtn.style}
        >
          <triggerBtn.icon fontSize={triggerBtn.iconSize || 'default'} />
        </IconButton>
      );
    } else if (triggerBtn.type === 'menu') {
      return (
        <MenuItem onClick={handleDialogOpen}>
          <triggerBtn.icon style={triggerBtn.iconStyle} />
          {triggerBtn.text}
        </MenuItem>
      );
    }else if (triggerBtn.type === 'round') {
      return (
        <Button
          color={triggerBtn.color || 'primary'}
          variant={triggerBtn.variant || 'contained'}
          size={triggerBtn.size || 'medium'}
          onClick={handleDialogOpen}
          style={triggerBtn.style}
          className={classes.roundIconButton}
        >
          <triggerBtn.icon />
        </Button>
      );
    } else {
      return (
        <Button
          color={triggerBtn.color || 'primary'}
          variant={triggerBtn.variant || 'contained'}
          size={triggerBtn.size || 'medium'}
          startIcon={<triggerBtn.icon />}
          onClick={handleDialogOpen}
          style={triggerBtn.style}
          className={triggerBtn.className}
        >
          {triggerBtn.text}
        </Button>
      );
    }
  };

  return (
    <div style={{ display: 'inline' }}>
      {triggerButton()}
      <Dialog open={dialogOpen} onClose={handleDialogOpen}>
        <DialogTitle disableTypography>
          <Typography color="primary" variant="h6">
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Typography>{contentText}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            color="default"
            variant="outlined"
            size="small"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmedAction}
            color="primary"
            variant="contained"
            size="small"
          >
            {actionBtnText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
