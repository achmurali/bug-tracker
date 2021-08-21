import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    Paper,
    Typography,
    Button,
    Divider,
    useMediaQuery,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import { useTheme } from '@material-ui/core/styles';
import { format } from 'date-fns';

import {
    deleteProject,
    getProject
} from '../controllers/projects';
import { selectProjectState } from '../redux/slices/projectSlice';
import { selectAuthState } from '../redux/slices/authSlice';
import ProjectForm from './projectsForm';
import MembersCard from './membersCard';
import BugsPage from './bugsPage';
import ConfirmDialog from '../components/confirmDialog';
import FormDialog from '../components/formDialog';
import { useMainPageStyles } from '../styles';


interface ParamTypes {
    projectId: string;
}

const ProjectDetailsPage = () => {

    const classes = useMainPageStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { projectId } = useParams<ParamTypes>();
    const history = useHistory();
    const dispatch = useDispatch();
    const [viewMembers, setViewMembers] = useState(false);
    const { user } = useSelector(selectAuthState);
    const projectInState = useSelector(selectProjectState);

    useEffect(() => {
        dispatch(getProject(projectId));
    },[projectId])

    if(!projectInState.project){
        console.log(projectInState)
        return (
            <div>Loading</div>
        );
    }
    if (!projectInState) {
        return (
            <div className={classes.root}>
                <Paper className={classes.notFoundPaper}>
                    <Typography
                        variant="h6"
                        className={classes.error404Text}
                        style={{ marginTop: '5em' }}
                    >
                        404: Project Not Found!
                    </Typography>
                </Paper>
            </div>
        );
    }

    const { project,members,bugs } = projectInState.project;

    const isAdmin = project[0].id === user?.id;

    const handleDeleteProject = () => {
        dispatch(deleteProject(project[0].id, history));
    };

    const handleLeaveProject = () => {
        //dispatch(leaveProjectMembership(project[0].id, history));
    };

    const showMembersBtn = () => {
        if (members.length < 2) return null;

        if (isMobile) {
            return (
                <Button
                    color={viewMembers ? 'secondary' : 'primary'}
                    variant="contained"
                    onClick={() => setViewMembers(!viewMembers)}
                    style={{ marginRight: '1em' }}
                    className={classes.roundIconButton}
                >
                    {viewMembers ? <ExpandLessIcon /> : <PeopleAltTwoToneIcon />}
                </Button>
            );
        } else {
            return (
                <Button
                    color="secondary"
                    variant="outlined"
                    startIcon={viewMembers ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    onClick={() => setViewMembers(!viewMembers)}
                    style={{ marginRight: '1em' }}
                >
                    {viewMembers ? 'Hide Members' : 'View Members'}
                </Button>
            );
        }
    };

    const leaveProjectBtn = () => {
        if (isAdmin) return null;

        return (
            <ConfirmDialog
                title="Confirm Leave Project"
                contentText="Are you sure you want to leave the project's membership?"
                actionBtnText="Leave Project"
                triggerBtn={{
                    type: isMobile ? 'round' : 'normal',
                    text: 'Leave Project',
                    icon: ExitToAppOutlinedIcon,
                }}
                actionFunc={handleLeaveProject}
            />
        );
    };

    const adminBtns = () => {
        if (!isAdmin) return null;

        return (
            <>
                <FormDialog
                    triggerBtn={{
                        type: isMobile ? 'round' : 'normal',
                        text: 'Add Members',
                        icon: GroupAddOutlinedIcon,
                        style: { marginRight: '1em' },
                    }}
                    title="Add members to project"
                >
                    <ProjectForm
                        editMode="members"
                        currentMembers={members.map((m:any) => m.user_id)}
                        projectId={project[0].id}
                    />
                </FormDialog>
                <ConfirmDialog
                    title="Confirm Delete Project"
                    contentText="Are you sure you want to permanently delete your project?"
                    actionBtnText="Delete Project"
                    triggerBtn={{
                        type: isMobile ? 'round' : 'normal',
                        text: 'Delete Project',
                        icon: DeleteOutlineIcon,
                    }}
                    actionFunc={handleDeleteProject}
                />
            </>
        );
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.detailsHeader}>
                <div className={classes.flexHeader}>
                    <Typography
                        variant={isMobile ? 'h5' : 'h4'}
                        style={{ marginRight: '0.2em' }}
                    >
                        <strong>{project[0].name}</strong>
                    </Typography>
                    {isAdmin && (
                        <FormDialog
                            triggerBtn={{ type: 'icon', icon: EditIcon, size: 'small' }}
                            title="Edit the project name"
                        >
                            <ProjectForm editMode="name" currentName={project[0].name} projectId={project[0].id} />
                        </FormDialog>
                    )}
                </div>
                <Divider style={{ margin: '0.5em 0' }} />
                <Typography variant="subtitle2" color="primary">
                    Admin: <strong>{project[0].admin}</strong>
                </Typography>
                <Typography variant="subtitle2" color="primary">
                    Created At: <em>{format(new Date(project[0].timestamp), "MMM d', ' YYY")}</em>
                </Typography>
                {project[0].timestamp !== project[0].updatedat && (
                    <Typography variant="subtitle2" color="primary">
                        Updated At: <em>{format(new Date(project[0].updatedat), "MMM d', ' YYY")}</em>
                    </Typography>
                )}
                <div className={classes.btnsWrapper}>
                    {showMembersBtn()}
                    {leaveProjectBtn()}
                    {adminBtns()}
                </div>
                {members.length > 1 && (
                    <MembersCard
                        members={members}
                        viewMembers={viewMembers}
                        adminId={project[0].admin}
                        projectId={project[0].id}
                        isMobile={isMobile}
                    />
                )}
            </Paper>
            <BugsPage projectId={projectId} isMobile={isMobile} bugs={bugs}/>
        </div>
    );
};

export default ProjectDetailsPage;
