import React from 'react';
import {Switch,Route, Redirect} from 'react-router-dom';

import Login from './pages/login';
import Home from './pages/home';
import Signup from './pages/signup';
import PageNotFound from './pages/static/pageNotFound';
import { useSelector } from 'react-redux';
import { selectAuthState } from './redux/slices/authSlice';
import { getUser } from './utils/localStorage';

const Routes = () => {
    const userData = useSelector(selectAuthState);
    const isLoggedIn = userData.user != null || getUser();

    return (
        <Switch>
            <Route exact path="/">
                {!isLoggedIn ? <Login /> : <Home />}
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
            <Route>
                <PageNotFound />
            </Route>
        </Switch>
    );
};

export default Routes;