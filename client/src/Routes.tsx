import React from 'react';
import {Switch,Route} from 'react-router-dom';

import Login from './pages/login';
import Home from './pages/home';

const Routes = () => {
    return (
        <Switch>
            <Route path="/login">
                <Login/>
            </Route>
            <Route path="/home">
                <Home/>
            </Route> 
            <Route path="/">
                <Home/>
            </Route>
        </Switch>
    );
};

export default Routes;