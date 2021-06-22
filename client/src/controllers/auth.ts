import { ICredentials } from '../models/auth';
import authService from '../services/auth';
import { AppThunk } from '../redux/store';
import { setUser,removeUser } from '../redux/slices/authSlice';
import { setLoading } from '../redux/slices/loadingSlice';
import * as localStorage from '../utils/localStorage';
import notify from './notification';
import { addError,removeError } from '../redux/slices/errorSlice';
import { clearNotification } from '../redux/slices/notificationSlice';

type Token = string | null;

let token: Token = null;

const setToken = (newToken: string) => {
    token = newToken;
};

export const setConfig = () => {
    return {
      headers: { 'x-auth-token': token },
    };
};

export const login = (credentials : ICredentials):AppThunk => {
        return async (dispatch) => {
            try{
                dispatch(setLoading({isLoading:true}));
                dispatch(removeError());
                const result = await authService.login(credentials);
                dispatch(setUser(result));

                localStorage.saveUser(result);
                setToken(result.token);
                dispatch(notify('Welcome Back!!!!','success'));
            }
            catch(err){
                setError(err,dispatch);
            }
            finally{
                dispatch(setLoading({isLoading:false}));
            }
        }
}

export const signup = (credentials : ICredentials):AppThunk => {
    return async (dispatch) => {
        try{
        dispatch(setLoading({isLoading:true}));
        dispatch(removeError());
        const result = await authService.signup(credentials);

        dispatch(notify('User Successfully Created!!!!','success'))
        }
        catch(err){
            setError(err,dispatch);
        }
        finally{
            dispatch(setLoading({isLoading:false}));
        }
    };
}

const setError = (err:any , dispatch:any) => {
    dispatch(addError({message:err.message,additionalInfo:err.stack}));
    dispatch(notify(err.message,'error'));
}

export const logout = ():AppThunk => {
    return (dispatch) => {
        dispatch(removeError());
        dispatch(removeUser());
        dispatch(notify("Come back soon :)","success"));
        localStorage.removeUser();
    }
}

export const autoLogin = ():AppThunk => {
    return (dispatch) => {
        const loggedUser = localStorage.getUser();
        if (loggedUser) {
            dispatch(setUser(loggedUser));
            setToken(loggedUser.token);
            dispatch(clearNotification());
            dispatch(notify('Welcome Back!!!!','success'));
        }
    };
}