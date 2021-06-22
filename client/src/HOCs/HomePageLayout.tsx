import React from 'react';
import { makeStyles, Paper, Typography, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    headerPaper: {
        padding: "1.5em",
        display:"flex",
        alignItems:"center"
    },
    headerIcon: {
        display: "inline",
        fontSize: "4.5em",
        marginRight:"0.2em"
    },
    headerDiv:{
        display:"inline"
    },
    mainPaper:{
        padding:"1.5em",
        display:"flex",
        marginTop:"1.5em"
    }
}));

const HomePageLayout: any = (props: any) => (Component: React.ElementType) => {
    const Icon = props.icon;

    return () => {
        const classes = useStyles();

        return (
            <>
                <Container disableGutters={true}>
                    <Paper className={classes.headerPaper} color="main">
                        <Icon fontSize="large" className={classes.headerIcon} />
                        <div className={classes.headerDiv}>
                            <Typography variant="h5">{props.header}</Typography>
                            <Typography variant="body1">{props.description}</Typography>
                        </div>
                    </Paper>
                </Container>
                <Container disableGutters={true}>
                    <Paper className={classes.mainPaper} color="main">
                        <Component />
                    </Paper>
                </Container>
            </>
        )
    }
};

export default HomePageLayout;