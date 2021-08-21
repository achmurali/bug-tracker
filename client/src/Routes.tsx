import React from 'react';
import {Switch,Route, Redirect} from 'react-router-dom';

import Login from './pages/login';
import Home from './pages/home';
import Signup from './pages/signup';
import PageNotFound from './pages/static/pageNotFound';
import ProjectDetailsPage from './pages/projectDetailsPage';
import { useSelector } from 'react-redux';
import { selectAuthState } from './redux/slices/authSlice';
import { getUser } from './utils/localStorage';
import { Container } from '@material-ui/core';
const Routes = () => {
    const userData = useSelector(selectAuthState);
    const result = getUser();
    const isLoggedIn = userData.user != null || result;

    return (
        <Container disableGutters={true}>
            <Switch>
                <Route exact path="/">
                    {!isLoggedIn ? <Login /> : <Home />}
                </Route>
                <Route exact path="/projects/:projectId">
                    {isLoggedIn ? <ProjectDetailsPage /> : <Redirect to = "/" />}
                </Route>
                <Route exact path="/login">
                    {!isLoggedIn ? <Login /> : <Redirect to="/"/>}
                </Route>]
                <Route exact path="/signup">
                    {!isLoggedIn ? <Signup /> : <Redirect to="/"/>}
                </Route>
                <Route exact path="/home">
                    <Home/>
                </Route> 
                {/* <Route exact path="/projects/:projectId/bugs/:bugId">
                    {user ? <BugDetailsPage /> : <Redirect to="/" />}
                </Route> */}
                <Route>
                    <PageNotFound />
                </Route>
            </Switch>
        </Container>
    );
};

export default Routes;