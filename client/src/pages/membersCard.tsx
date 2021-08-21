import React, { useState } from 'react';
import { Typography, Collapse, makeStyles } from '@material-ui/core';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';

import MembersTable from './membersTable';
import SearchBar from '../components/searchBar';
import InfoText from '../components/infotext';

const useStyles = makeStyles((theme) => ({
      flexHeader: {
        display: 'flex',
        alignItems: 'center',
      },
      membersWrapper: {
        marginTop: '1em',
      },
      filterMembersInput: {
        [theme.breakpoints.down('xs')]: {
          width: '55%',
        },
      },
      flexInput: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
          marginTop: '0.3em',
        },
      }
}));

const MembersCard: React.FC<{
  members: any[];
  viewMembers: boolean;
  adminId: string;
  projectId: string;
  isMobile: boolean;
}> = ({ members, viewMembers, adminId, projectId, isMobile }) => {
  const classes = useStyles();
  const [filterValue, setFilterValue] = useState('');

  const filteredMembers = members.filter((m) =>
    m.username.toLowerCase().includes(filterValue.toLowerCase())
  );

  const membersDataToDisplay = () => {
    if (filteredMembers.length === 0) {
      return (
        <InfoText text="No matches found." variant={isMobile ? 'h6' : 'h5'} />
      );
    } else {
      return (
        <div style={{ marginTop: '1em' }}>
          <MembersTable
            members={filteredMembers}
            adminId={adminId}
            projectId={projectId}
            isMobile={isMobile}
          />
        </div>
      );
    }
  };

  return (
    <Collapse
      in={viewMembers}
      timeout="auto"
      unmountOnExit
      className={classes.membersWrapper}
    >
      <div className={classes.flexInput}>
        <Typography
          variant={isMobile ? 'h6' : 'h5'}
          color="secondary"
          className={classes.flexHeader}
        >
          <PeopleAltOutlinedIcon
            fontSize={isMobile ? 'default' : 'large'}
            style={{ marginRight: '0.2em' }}
          />
          Members
        </Typography>
        <div className={classes.filterMembersInput}>
          <SearchBar
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            label="Members"
            size="small"
          />
        </div>
      </div>
      {membersDataToDisplay()}
    </Collapse>
  );
};

export default MembersCard;
