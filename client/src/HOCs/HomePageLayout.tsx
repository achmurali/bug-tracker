import React from 'react';
import { Grid } from '@material-ui/core';

const HomePageLayout:any = (Component:React.ElementType) => {
    return () =>  (
        <Grid container spacing={0}
            alignItems="center"
            justify="center"
            style={{
                minHeight:'100vh',
                minWidth:'100vh'
            }}>
            <Grid item sm={2}/>
            <Grid item sm = {8}>
                <Component />    
            </Grid>
            <Grid item sm={2}/>
        </Grid>
    )
};

export default HomePageLayout;