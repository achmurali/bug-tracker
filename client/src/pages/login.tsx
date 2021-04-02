import React from 'react';
import { makeStyles, Paper, Grid, TextField, Typography,Button,InputAdornment} from '@material-ui/core'
import { useForm } from "react-hook-form";
import PersonIcon from '@material-ui/icons/Person'
import LockIcon from '@material-ui/icons/Lock'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface InputValues {
  username: string;
  password: string;
}

const validationSchema = Yup.object({
    username: Yup.string().required(),
    password: Yup.string().required()
})

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

    const classes = useStyles();
    const { register, handleSubmit, errors} = useForm<InputValues>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
    });

    const onSubmit = () => {

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
                <Typography align="center" display="block" variant="h6" className = {classes.heading}>
                    Login :D
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                    <TextField
                        inputRef = {register}
                        name = "username"
                        label = "User Name"
                        required = {true}
                        size = "medium"
                        variant = "standard"
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
                    >
                    </TextField>
                    <TextField
                        inputRef = {register}
                        name = "password"
                        label = "Password"
                        required = {true}
                        size = "medium"
                        variant = "standard"
                        classes = {{
                            root:classes.textField
                        }}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon color="primary" />
                            </InputAdornment>
                            ),
                        }}
                        >
                    </TextField>
                    <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        fullWidth
                        type="submit"
                        className ={classes.submit}
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