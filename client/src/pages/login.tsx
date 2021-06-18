import React, {useState} from 'react';
import { makeStyles,Paper,Grid,Typography,Button,InputAdornment,IconButton,LinearProgress } from '@material-ui/core'
import { useForm } from "react-hook-form";
import PersonIcon from '@material-ui/icons/Person'
import LockIcon from '@material-ui/icons/Lock'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import InputField from '../components/inputfield';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoadingState } from '../redux/slices/loadingSlice';
import { login } from '../controllers/auth';
import { ICredentials } from '../models/auth';
import { useHistory } from 'react-router';

interface InputValues {
  username: string;
  password: string;
}

const validationSchema = yup.object().shape({
    username:yup.string().required('Required'),
    password:yup.string().required('Required')
});

const useStyles = makeStyles((theme) => ({
    root:{
        flexGrow: 1,
        justifyContent: "center"
    },
    paper:{
        width: '30em',
        height: '30em'
    },
    form:{
        textAlign:"center"
    },
    textField:{
        margin:"2em 0 2em 0",
        width: "250px"
    },
    heading:{
        marginTop:"1em"
    },
    submit:{
        width: "250px",
        marginTop:"0.5em"
    }
}))

const Login:React.FC = () => {

    const [showPassword, setShowPassword] = useState(false);
    const classes = useStyles();
    const loading = useSelector(selectLoadingState);
    const dispatch = useDispatch();
    const history = useHistory();

    const { control, handleSubmit, formState:{ errors }} = useForm<InputValues>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
    });

    const onSubmit = ({username,password}:ICredentials) => {
        dispatch(login({username,password}));
        history.push("/")
    }

    return (
        <Grid container
            spacing={0}
            direction="row"
            alignItems="center"
            justify="center"
            style = {{
                minHeight: '100vh'
            }}>
            <Grid item container xs = {6} sm = {6}
                    alignItems="center" 
                    justify="center"
                    direction = "row">
                <Paper elevation={4} classes={{
                    root:classes.paper
                }}>
                {loading.isLoading && <LinearProgress />}    
                <Typography align="center" display="block" variant="h6" className = {classes.heading}>
                    Login :D
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                    <InputField
                        name = "username"
                        control = {control}
                        label = "User Name"
                        size = "medium"
                        variant = "standard"
                        defaultValue=""
                        classes = {{
                            root:classes.textField
                        }}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon color="primary" />
                            </InputAdornment>
                            ),
                            }}
                        error = {errors.username}
                    >
                    </InputField>
                    <InputField
                        name = "password"
                        label = "Password"
                        control = {control}
                        size = "medium"
                        variant = "standard"
                        defaultValue=""
                        classes = {{
                            root:classes.textField
                        }}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword((prevState:boolean) => !prevState)}
                                    size="small"
                                >
                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                            ),
                            startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon color="primary" />
                            </InputAdornment>
                            ),
                        }}
                        error = {errors.password}
                        >
                    </InputField>
                    <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        fullWidth
                        type="submit"
                        className ={classes.submit}
                        disabled={loading.isLoading}
                        >
                        Log In
                    </Button>
                </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Login;