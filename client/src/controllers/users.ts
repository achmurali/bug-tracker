import { AppThunk } from "../redux/store";

import { setLoading } from "../redux/slices/loadingSlice";
import { addError, removeError } from "../redux/slices/errorSlice";
import notify from "./notification";
import { setUsers } from '../redux/slices/usersSlice';
import userService from '../services/users';


export const fetchUsers = (): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setLoading({isLoading:true}));
      dispatch(removeError());
      const allUsers = await userService.getUsers();
      console.log("++++++++++++++++++++"+allUsers);
      dispatch(setUsers(allUsers));
    } catch (e) {
      setError(e,dispatch);
    } finally{
        dispatch(setLoading({isLoading:false}));
    }
  };
};

const setError = (err: any, dispatch: any) => {
  dispatch(addError({ message: err.message, additionalInfo: err.stack }));
  dispatch(notify(err.message, "error"));
};
