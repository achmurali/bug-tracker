import React from 'react'

import HomePageLayout from '../HOCs/HomePageLayout';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ProjectsPage from './projectsPage';

const Home:React.FC = () => {
    return (
        <ProjectsPage />
    )
};

export default HomePageLayout({icon:ListAltIcon,header:"All Projects",description:"View, Add and Edit all Projects "})(Home);