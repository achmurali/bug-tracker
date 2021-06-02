import React from 'react';
import {Switch,Route} from 'react-router-dom';

import Login from './pages/login';
import Home from './pages/home';
import Signup from './pages/signup';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route exact path="/login">
                <Login/>
            </Route>]
            <Route exact path="/signup">
                <Signup/>
            </Route>
            <Route exact path="/home">
                <Home/>
            </Route> 
        </Switch>
    );
};

export default Routes;