import React from 'react';

import Alert from '@material-ui/lab/Alert';
import { Snackbar,makeStyles } from '@material-ui/core';
import { clearNotification, selectNotificationState } from '../redux/slices/notificationSlice';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    snackbar: {
      [theme.breakpoints.down('xs')]: {
        bottom: 75,
      },
    },
  }));

const SnackBar = () => {
    const dispatch = useDispatch();
    const { message,type } = useSelector(selectNotificationState);

    const classes = useStyles();
    const onCloseHandler = () => {
        dispatch(clearNotification());
    }

    if (!message || !type) return null;

    return (
        <Snackbar onClose={onCloseHandler}
            open={!!message}
            anchorOrigin={{vertical:'bottom',horizontal:'center'}}
            className={classes.snackbar}>
            <Alert onClose={onCloseHandler} severity={type}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default SnackBar;