import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import {
    TableRow,
    TableCell,
    Link,
    makeStyles
} from '@material-ui/core';

import TableActionHeader from '../components/tableActionHeader';
import LoadingSpinner from '../components/loadingSpinner';
import { ProjectSortValues } from '../models/projects';
import ProjectsForm from './projectsForm';
import Table from '../components/table';
import InfoText from '../components/infotext';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthState } from '../redux/slices/authSlice';
import { selectLoadingState } from '../redux/slices/loadingSlice';
import { selectErrorState } from '../redux/slices/errorSlice';
import { formatDateTime, truncateString } from '../utils/helpers';
import ProjectsMenu from './projectsMenu';
import { selectProjectsState,sortProjectsBy } from '../redux/slices/projectsSlice';
import sortProjects from '../utils/sortProjects';

const menuItems = [
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'a-z', label: 'Name (A - Z)' },
    { value: 'z-a', label: 'Name (Z - A)' },
    { value: 'most-bugs', label: 'Most Bugs' },
    { value: 'least-bugs', label: 'Least Bugs' },
    { value: 'most-members', label: 'Most Members' },
    { value: 'least-members', label: 'Least Members' },
];

const tableHeaders = ['Name', 'Bugs', 'Members', 'Admin', 'Added', 'Actions'];

const useTableStyles = makeStyles(
    (theme) => ({
        clickableCell: {
            '&:hover': {
                backgroundColor: theme.palette.primary.main + '15',
                cursor: 'pointer',
            },
        },
        scrollableTable: {
            '& thead th': {
                fontWeight: '600',
                color: theme.palette.secondary.main,
                backgroundColor: theme.palette.primary.light,
            },
            overflowY: 'auto',
            maxHeight: '350px',
        },
        projectsListTable: {
            marginTop: '1.5em',
            [theme.breakpoints.down('xs')]: {
              marginTop: 0,
            },
        }
    })
);

export const ProjectTableRow = (p: any) => {

    const classes = useTableStyles();
    const history = useHistory();
    const { user } = useSelector(selectAuthState);

    return (
        <TableRow key={p.id}>
            <TableCell
                onClick={() => history.push(`/projects/${p.id}`)}
                className={classes.clickableCell}
                align="center"
            >
                <Link
                    component={RouterLink}
                    to={`/projects/${p.id}`}
                    color="secondary"
                >
                    {truncateString(p.name, 30)}
                </Link>
            </TableCell>
            <TableCell align="center">{p.bugs.length}</TableCell>
            <TableCell align="center">{p.members.length}</TableCell>
            <TableCell align="center">{p.createdBy.username}</TableCell>
            <TableCell align="center">
                {formatDateTime(p.createdAt)}
            </TableCell>
            <TableCell align="center">
                <ProjectsMenu
                    projectId={p.id}
                    currentName={p.name}
                    currentMembers={p.members.map((m:any) => m.member.id)}
                    isAdmin={p.createdBy.id === user?.id}
                />
            </TableCell>
        </TableRow>)
}

const ProjectsPage = () => {
    const dispatch = useDispatch();
    //Sort Bar 
    const handleSortChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        //const selectedValue = e.target.value;
        //@ts-nocheck
        dispatch(sortProjectsBy(e.target.value));
    };

    //Search Bar
    const [searchValue, setSearchValue] = useState("");

    const classes = useTableStyles();
    const loading = useSelector(selectLoadingState);
    const error = useSelector(selectErrorState);
    const { projects,sortBy } = useSelector(selectProjectsState);

    const filteredSortedProjects = sortProjects(
        projects.filter((p) =>
          p.name.toLowerCase().includes(searchValue.toLowerCase())
        ),
        sortBy
      );

    const display = () => {
        if (loading.isLoading) {
            return (
                <LoadingSpinner
                    marginTop='9em'
                    size="80"
                />
            );
        } else if (!loading.isLoading && projects.length === 0) {
            return (
                <InfoText
                    text="No Projects added yet."
                    variant='h5'
                />
            );
        } else if (error.message) {
            return (
                <InfoText
                    text={`Error: ${error.message}`}
                    variant='h5'
                />
            );
        } else if (
            !error.message &&
            projects.length !== 0 &&
            filteredSortedProjects.length === 0
        ) {
            return (
                <InfoText text="No matches found." variant='h5' />
            );
        } else {
            return (
                <div className={classes.projectsListTable}>
                    <Table data={filteredSortedProjects} headers={tableHeaders} body={ProjectTableRow}/>
                </div>
            );
        }
    }

    return (
        <>
        <TableActionHeader menuItems={menuItems} handleSortChange={handleSortChange} label={"Projects"} sortBy={sortBy} handleSearchBar={setSearchValue} searchValue = {searchValue} icon={<AddIcon />} dialog={<ProjectsForm editMode={null} />} />
        { display() }
        </>
    );
}

export default ProjectsPage;