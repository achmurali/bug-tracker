import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';

import { selectAuthState } from '../redux/slices/authSlice';
import { removeProjectMember } from '../controllers/projects';
import ConfirmDialog from '../components/confirmDialog';

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  makeStyles
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import BlockIcon from '@material-ui/icons/Block';

const memberHeaders = ['ID', 'Username', 'Role', 'Joined'];

const useStyles = makeStyles((theme) => ({
    scrollableTable: {
        '& thead th': {
          fontWeight: '600',
          color: theme.palette.secondary.main,
          backgroundColor: theme.palette.primary.light,
        },
        overflowY: 'auto',
        maxHeight: '350px',
      }
}))

const MembersTable: React.FC<{
  members: any[];
  adminId: string;
  projectId: string;
  isMobile: boolean;
}> = ({ members, adminId, projectId, isMobile }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthState);

  const isAdmin = adminId === user?.id;

  const handleRemoveMember = (memberId: string) => {
    dispatch(removeProjectMember(projectId, memberId));
  };

  return (
    <Paper className={classes.scrollableTable}>
      <Table stickyHeader size={isMobile ? 'small' : 'medium'}>
        <TableHead>
          <TableRow>
            {memberHeaders.map((m) => (
              <TableCell key={m} align="center">
                {m}
              </TableCell>
            ))}
            {isAdmin && <TableCell align="center">Remove</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((m) => (
            <TableRow key={m.user_id}>
              <TableCell align="center">{m.user_id}</TableCell>
              <TableCell align="center">
                {m.username} {m.user_id === user?.id && '(You)'}
              </TableCell>
              <TableCell align="center">
                {m.user_id === adminId ? 'Admin' : 'Member'}
              </TableCell>
              <TableCell align="center">
                {format(new Date(m.joinedat), "MMM d', ' YYY")}
              </TableCell>
              {isAdmin && (
                <TableCell align="center">
                  {m.user_id === user?.id ? (
                    <BlockIcon
                      color="secondary"
                      fontSize={isMobile ? 'default' : 'large'}
                    />
                  ) : (
                    <ConfirmDialog
                      title="Confirm Remove Member"
                      contentText={`Are you sure you want to remove ${m.member.username} from your project?`}
                      actionBtnText="Remove Member"
                      triggerBtn={{
                        type: 'icon',
                        iconSize: isMobile ? 'default' : 'large',
                        icon: HighlightOffIcon,
                        size: 'small',
                      }}
                      actionFunc={() => handleRemoveMember(m.user_id)}
                    />
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default MembersTable;
