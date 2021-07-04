import React, { useContext } from 'react';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import { Container, makeStyles } from '@material-ui/core';
import { SvgIcon,IconButton,useTheme,AppBar,Toolbar,Tooltip,Button,Avatar } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import { ThemeContext } from "../themes/customThemeProvider"
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../redux/slices/themeSlice'
import { RootState } from '../redux/store';
import { lightThemeIcon,darkThemeIcon } from '../utils/constants'
import bugIcon from '../svg/bug-logo.svg';
import NavButton from './nav-button';
import { selectAuthState } from '../redux/slices/authSlice';
import { logout } from '../controllers/auth';

const useStyles = makeStyles((theme) => ({
    toolBar : {
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        position:'sticky',
        marginBottom:'1.5em'
    },
    endDiv : {
        display: 'inline-flex',
        position: 'absolute',
        right: '1em',
        alignItems:"center"
    },
    themeButton : {
        zIndex : theme.zIndex.drawer + 1,
        boxShadow: theme.shadows[5],
        marginLeft:"0.5em",
        "&:hover":{
            opacity: '0.7'
        },
        height:"2em",
        border: `2px solid ${theme.palette.text.primary}`,
    },
    logoBtn: {
        textTransform: 'none',
        fontSize: '1.2em',
        padding: '0.1em',
        marginRight: '0.3em',
        [theme.breakpoints.down('xs')]: {
          fontSize: '1em',
          marginLeft: '0.6em',
        },
        color:"white"
      },
      backBtn: {
        [theme.breakpoints.down('xs')]: {
          marginLeft: '0.6em',
        },
      },
      svgImage: {
        width: '35px',
        marginRight: '5px',
        [theme.breakpoints.down('xs')]: {
          width: '30px',
        },
      },
      logoWrapper: {
        marginRight: '1em',
        display: 'flex',
        alignItems: 'center',
      },
      leftPortion: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
      },
      avatar:{
        display:"inline-flex",
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.contrastText,
      }
}))

const NavigationBar:React.FC = () => {

    const setTheme = useContext(ThemeContext); 
    const classes = useStyles();
    const dispatch = useDispatch();
    const globalTheme = useTheme();
    const theme = useSelector((state:RootState) => state.theme);
    const history = useHistory();
    const { pathname } = useLocation();
    const userData = useSelector(selectAuthState);

    const handleThemeClick = () => {
        dispatch(toggleDarkMode());
        setTheme();
    };

    const handleGoBack = () => {
        if (pathname.includes('/bugs')) {
            history.push(`${pathname.slice(0, pathname.indexOf('/bugs'))}`);
          } else {
            history.push('/');
          }
    }

    const handleLogout = () => {
      dispatch(logout());
      history.push("/login");
    }

    const mainButton = () => {
        if (['/', '/login', '/signup'].includes(pathname)) {
          return (
            <div className={classes.logoWrapper}>
              <Button
                className={classes.logoBtn}
                component={RouterLink}
                to="/"
                color="secondary"
              >
                <img src={bugIcon} alt="logo" className={classes.svgImage} />
                BugTracker
              </Button>
            </div>
          );
        } else {
          return (
            <Button
              startIcon={<ArrowBackIcon />}
              color="secondary"
              onClick={handleGoBack}
              className={classes.backBtn}
            >
              {pathname.includes('/bugs') ? 'Project' : 'Home'}
            </Button>
          );
        }
      };

    return (
      <Container disableGutters={true}>
        <AppBar className = {classes.appBar}>
            <Toolbar classes={{
                root: classes.toolBar
            }}>
                <div className={classes.leftPortion}>{mainButton()}</div>
                <div className = {classes.endDiv}>
                  {!userData.user ? 
                    (
                    <>
                      <NavButton variant="outlined" to="/login" component={RouterLink} startIcon={<ExitToAppIcon />}> 
                        Login
                      </NavButton>
                      <NavButton variant="outlined" to="/signup" component={RouterLink} startIcon={<PersonAddIcon />}>
                        Signup
                      </NavButton>
                    </>
                    ):
                    <>
                      <NavButton variant="outlined" onClick={handleLogout} startIcon={<PowerSettingsNewIcon />}>Logout</NavButton>
                      <Avatar className={classes.avatar}>{userData.user.username.charAt(0)}</Avatar>
                    </>
                    } 
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
        </Container>
    );
};

export default NavigationBar;