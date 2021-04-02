import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core';
import { SvgIcon,IconButton,useTheme,AppBar,Toolbar,Tooltip } from '@material-ui/core'

import { ThemeContext } from "../themes/customThemeProvider"
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../redux/slices/themeSlice'
import { RootState } from '../redux/store';
import { lightThemeIcon,darkThemeIcon } from '../utils/constants'

const useStyles = makeStyles((theme) => ({
    toolBar : {
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    endDiv : {
        display: 'block',
        position: 'absolute',
        right: '1em'
    },
    themeButton : {
        zIndex : theme.zIndex.drawer + 1,
        boxShadow: theme.shadows[5],
        "&:hover":{
            opacity: '0.7'
        },
        border: `2px solid ${theme.palette.text.primary}`,
    }
}))

const NavigationBar:React.FC = () => {

    const setTheme = useContext(ThemeContext); 
    const classes = useStyles();
    const dispatch = useDispatch();
    const globalTheme = useTheme();
    const theme = useSelector((state:RootState) => state.theme)

    const handleThemeClick = () => {
        dispatch(toggleDarkMode());
        setTheme();
    };

    return (
        <AppBar className = {classes.appBar}>
            <Toolbar classes={{
                root: classes.toolBar
            }}>
                <div className = {classes.endDiv}>
                    <IconButton onClick = {handleThemeClick} className = {classes.themeButton}>
                        <Tooltip title="Switch Mode">
                            <SvgIcon>
                                <path d={theme.darkmode ? lightThemeIcon : darkThemeIcon} 
                                    color= {globalTheme.palette.text.primary} />
                            </SvgIcon>
                        </Tooltip>
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;