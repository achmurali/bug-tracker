import { ICredentials } from '../models/auth';
import authService from '../services/auth';
import { AppThunk } from '../redux/store';
import { setUser } from '../redux/slices/authSlice';
import { setLoading } from '../redux/slices/loadingSlice';
import * as localStorage from '../utils/localStorage';
import notify from './notification';
import { addError } from '../redux/slices/errorSlice';

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
                const result = await authService.login(credentials);
                dispatch(setUser(result));

                localStorage.saveUser(result);
                setToken(result.token);
                dispatch(notify('Welcome Back!!!!','success'));
            }
            catch(err){
                if(typeof err === "string" ){
                    dispatch(addError({message:err}));
                }
                else
                    dispatch(addError({message:"Something Went Wrong!!!",additionalInfo:err}))
                dispatch(notify('Please try Again :(','error'));
            }
            finally{
                dispatch(setLoading({isLoading:false}));
            }
        }
}

export const signup = () => {

}