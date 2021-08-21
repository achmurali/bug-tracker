import { AppThunk } from "../redux/store";
import bugsService from "../services/bugs";
import { setLoading } from "../redux/slices/loadingSlice";
import * as projectSlice from "../redux/slices/projectSlice";
import { addError, removeError } from "../redux/slices/errorSlice";
import notify from "./notification";

export const editBug = (projectId:string,bugId:string,data:any,closeDialog?:any) : AppThunk=> {
    return async (dispatch) => {
        try{
            dispatch(setLoading({ isLoading: true }));
            dispatch(removeError());
            const result = await bugsService.editBug(projectId,bugId,data);
            dispatch(projectSlice.addBug(result));
            closeDialog && closeDialog();
        }
        catch(e){
            setError(e, dispatch);
        }
        finally{
            dispatch(setLoading({ isLoading: false }));
        }
    }
}

export const deleteBug = (projectId:string,bugId:string,history:any) : AppThunk=> {
    return async (dispatch) => {
        try{
            dispatch(setLoading({ isLoading: true }));
            dispatch(removeError());
            const result = await bugsService.deleteBug(projectId,bugId);
            dispatch(projectSlice.deleteBug(bugId));
            history.push(`/projects/${projectId}`);
        }
        catch(e){
            setError(e, dispatch);
        }
        finally{
            dispatch(setLoading({ isLoading: false }));
        }
    }
}
export const addBug = (projectId:string,data:any,closeDialog:any) : AppThunk=> {
    return async (dispatch) => {
        try{
            dispatch(setLoading({ isLoading: true }));
            dispatch(removeError());
            const result = await bugsService.addBug(projectId,data);
            delete result.bugId;
            result.notes = 0;
            dispatch(projectSlice.addBug(result));
            closeDialog && closeDialog();
        }
        catch(e){
            setError(e, dispatch);
        }
        finally{
            dispatch(setLoading({ isLoading: false }));
        }
    }
}

const setError = (err: any, dispatch: any) => {
    dispatch(addError({ message: err.message, additionalInfo: err.stack }));
    dispatch(notify(err.message, "error"));
  };
