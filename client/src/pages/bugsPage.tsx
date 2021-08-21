import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import BugReportOutlinedIcon from '@material-ui/icons/BugReportOutlined';
import { Paper, Typography,TableRow,TableCell,makeStyles,Link } from '@material-ui/core';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { format } from 'date-fns';

import sortBugs from '../utils/sortBugs';
import filterBugs from '../utils/filterBugs';
import LoadingSpinner from '../components/loadingSpinner';
import InfoText from '../components/infotext';
import TableActionHeader from '../components/tableActionHeader';
import Table from '../components/table';
import { useMainPageStyles } from '../styles';
import { selectLoadingState } from '../redux/slices/loadingSlice';
import BugsForm from './bugsForm';
import { selectErrorState } from '../redux/slices/errorSlice';
import { priorityStyles, statusStyles } from '../customStyles';
import BugsMenu from './bugsMenu';

const menuItems = [
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'a-z', label: 'Title (A - Z)' },
    { value: 'z-a', label: 'Title (Z - A)' },
    { value: 'h-l', label: 'Priority (High - Low)' },
    { value: 'l-h', label: 'Priority (Low - High)' },
    { value: 'closed', label: 'Recently Closed' },
    { value: 'reopened', label: 'Recently Re-opened' },
    { value: 'updated', label: 'Recently Updated' },
    { value: 'most-notes', label: 'Most Notes' },
    { value: 'least-notes', label: 'Least Notes' },
  ];

const tableHeaders = [
    'Title',
    'Priority',
    'Status',
    'Added',
    'Updated',
    'Notes',
    'Actions',
];

const useTableStyles = makeStyles(
    (theme) => ({
        clickableCell: {
            '&:hover': {
                backgroundColor: theme.palette.primary.main + '50',
                cursor: 'pointer',
            },
        },
        scrollableTable: {
            '& thead th': {
                fontWeight: '600',
                color: theme.palette.secondary.dark,
                backgroundColor: theme.palette.primary.dark,
            },
            overflowY: 'auto',
            maxHeight: '350px',
        },
        paper: {
            minHeight: 'calc(100vH - 405px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            [theme.breakpoints.down('xs')]: {
              padding: '0.7em 0.3em',
              minHeight: 'calc(100vH - 160px)',
            }
        }
    })
);

const BugTableRow = (b:any) => {
    const classes = useTableStyles();
    const history = useHistory();

    return (
        <TableRow key={b.user_id}>
          <TableCell
            align="center"
            onClick={() =>
              history.push(`/projects/${b.project_id}/bugs/${b.bug_id}`)
            }
            className={classes.clickableCell}
          >
            <Link
              component={RouterLink}
              to={`/projects/${b.project_id}/bugs/${b.bug_id}`}
              color="primary"
            >
              {b.name}
            </Link>
          </TableCell>
          <TableCell align="center">
            <div
              style={{
                ...priorityStyles(b.priority.toLowerCase()),
                textTransform: 'capitalize',
                margin: '0 auto',
              }}
            >
              {b.priority}
            </div>
          </TableCell>
          <TableCell align="center">
            <div
              style={{
                ...statusStyles(b.isResolved),
                margin: '0 auto',
              }}
            >
              {b.status}
            </div>
          </TableCell>
          <TableCell align="center">
            {format(new Date(b.created_timestamp), "MMM d', ' YYY")} ~ {b.createdBy_userId}
          </TableCell>
          <TableCell align="center">
            {!b.updatedTimestamp || !b.updatedBy
              ? 'n/a'
              : `${format(new Date(b.updatedAt), "MMM d', ' YYY")} ~ ${b.updatedBy}`}
          </TableCell>
          <TableCell align="center">{b.notes.length}</TableCell>
          <TableCell align="center">
            <BugsMenu
              projectId={b.project_id}
              bugId={b.bug_id}
              currentData={{
                title: b.name,
                description: b.description,
                priority: b.priority,
                status:b.status
              }}
              isResolved={b.isResolved}
            />
          </TableCell>
        </TableRow>
    )
}
  

const BugsCard: React.FC<{ projectId: string; isMobile: boolean, bugs: any[] }> = ({
    projectId,
    isMobile,
    ...props
}) => {

    const classes = useMainPageStyles();
    const dispatch = useDispatch();
    const [ filterValue, setFilterValue ] = useState('');
    const [ bugs,setBugs ] = useState<any[]>([]);
    const [ sortBy, setSortBy] = useState<string>("newest");
    const [ filterBy, setFilterBy ] = useState<string>("all");
    const loading = useSelector(selectLoadingState);
    const error = useSelector(selectErrorState);

    useEffect(() => {
        setBugs(props.bugs);
    },[bugs]);


    const filteredSortedBugs =
        bugs &&
        sortBugs(
            bugs.filter(
                (b) =>
                    b.name.toLowerCase().includes(filterValue.toLowerCase()) &&
                    filterBugs(filterBy, b)
            ),
            sortBy
        );

    const handleSortChange = (e:any) => {
        setSortBy(e.target.value)
    }

    const bugsDataToDisplay = () => {
        if (loading.isLoading) {
            return (
                <LoadingSpinner
                    marginTop={isMobile ? '3em' : '4em'}
                    size={isMobile ? 60 : 80}
                />
            );
        } else if (error.message) {
            return (
                <InfoText
                    text={`Error: ${error.message}`}
                    variant={isMobile ? 'h6' : 'h5'}
                />
            );
        } else if (!bugs || bugs.length === 0) {
            return (
                <InfoText text="No Bugs added yet." variant={isMobile ? 'h6' : 'h5'} />
            );
        } else if (!filteredSortedBugs || filteredSortedBugs.length === 0) {
            return (
                <InfoText text="No matches found." variant={isMobile ? 'h6' : 'h5'} />
            );
        } else {
            return (
                <div>
                    <Table data={filteredSortedBugs} headers={tableHeaders} body={BugTableRow}/>
                </div>
            );
        }
    };

    return (
        <Paper className={classes.bugsPaper}>
            <Typography
                variant={isMobile ? 'h6' : 'h5'}
                className={classes.flexHeader}
            >
                <BugReportOutlinedIcon
                    fontSize={isMobile ? 'default' : 'large'}
                    style={{ marginRight: '0.2em' }}
                />
                Bugs
            </Typography>
            <div className={classes.bugsActionCard}>
                <TableActionHeader menuItems={menuItems} handleSortChange={handleSortChange} label={"Bugs"} sortBy={sortBy} handleSearchBar={setFilterValue} searchValue={filterValue} icon={AddIcon} dialog={<BugsForm isEditMode={false} projectId={projectId}/>} filterBy={filterBy} handleFilterChange={setFilterBy} />
            </div>
            {bugsDataToDisplay()}
        </Paper>
    );
};

export default BugsCard;