import React from 'react'
import { Button, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router';

const useStyles = makeStyles(() => ({
    button:{
        color:"white",
        marginLeft:"o.5em",
        marginRight:"0.5em",
        backgroundColor:"transparent",
        border: "0.5px #fcfcfc solid"
    }
}));

const NavButton:React.FC<any> = ({name,variant,to, ...props}) => {
    const classes = useStyles();
    const history = useHistory();
    return (
        <Button variant={variant ? variant : 'outlined'} className={classes.button} {...props}>
            {props.children}
        </Button>
    )
}

export default NavButton;