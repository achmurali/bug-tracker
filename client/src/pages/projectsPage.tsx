import React, { useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import {
    TableRow,
    TableCell,
    Link,
    makeStyles,
    Paper
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
import { selectProjectsState, sortProjectsBy } from '../redux/slices/projectsSlice';
import sortProjects from '../utils/sortProjects';
import projectService from '../services/projects';

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
                backgroundColor: theme.palette.primary.main + '50',
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

export const ProjectTableRow = (p: any) => {

    const classes = useTableStyles();
    const history = useHistory();
    const [members,setMembers] = useState([]);
    const { user } = useSelector(selectAuthState);
    
    useEffect(() => {
        const getMembers = async () => { 
            const result = await projectService.getProjectMembers(p.id);
            setMembers(result.members); 
        }
        getMembers();
    },[])

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
                >
                    {truncateString(p.name, 30)}
                </Link>
            </TableCell>
            <TableCell align="center">{p.bugs}</TableCell>
            <TableCell align="center">{p.members}</TableCell>
            <TableCell align="center">{p.admin}</TableCell>
            <TableCell align="center">
                {formatDateTime(p.timestamp)}
            </TableCell>
            <TableCell align="center">
                <ProjectsMenu
                    projectId={p.id}
                    currentName={p.name}
                    currentMembers={members}
                    isAdmin={p.admin === user?.id}
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
        dispatch(sortProjectsBy(e.target.value as ProjectSortValues));
    };

    //Search Bar
    const [searchValue, setSearchValue] = useState("");

    const classes = useTableStyles();
    const loading = useSelector(selectLoadingState);
    const error = useSelector(selectErrorState);
    const { projects, sortBy } = useSelector(selectProjectsState);

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
                    size={60}
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
                <Table data={filteredSortedProjects} headers={tableHeaders} body={ProjectTableRow} />
            );
        }
    }

    return (
        <>
            <TableActionHeader menuItems={menuItems} handleSortChange={handleSortChange} label={"Projects"} sortBy={sortBy} handleSearchBar={setSearchValue} searchValue={searchValue} icon={AddIcon} dialog={<ProjectsForm editMode={null} />} />
            <Paper className={classes.paper} elevation={0}>
            {display()}
            </Paper>
        </>
    );
}

export default ProjectsPage;