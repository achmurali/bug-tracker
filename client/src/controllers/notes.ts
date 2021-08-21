import { AppThunk } from "../redux/store";
import notesService from "../services/notes";
import { setLoading } from "../redux/slices/loadingSlice";
import * as notesSlice from "../redux/slices/notesSlice";
import { addError, removeError } from "../redux/slices/errorSlice";
import notify from "./notification";

export const setNotes = (projectId:string,bugId:string) : AppThunk=> {
    return async (dispatch) => {
        try{
            dispatch(setLoading({ isLoading: true }));
            dispatch(removeError());
            const result = await notesService.getNotes(projectId,bugId);
            dispatch(notesSlice.setNotes(result));
        }
        catch(e){
            setError(e, dispatch);
        }
        finally{
            dispatch(setLoading({ isLoading: false }));
        }
    }
}

export const addNote = (projectId:string,bugId:string,note:string, closeDialog?:any) : AppThunk=> {
    return async (dispatch) => {
        try{
            dispatch(setLoading({ isLoading: true }));
            dispatch(removeError());
            const result = await notesService.createNote(projectId,bugId,note);
            dispatch(notesSlice.addNote(result));
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

export const deleteNote = (projectId:string,bugId:string,noteId:string) : AppThunk=> {
    return async (dispatch) => {
        try{
            dispatch(setLoading({ isLoading: true }));
            dispatch(removeError());
            const result = await notesService.deleteNote(projectId,bugId,noteId);
            dispatch(notesSlice.removeNote(noteId));
        }
        catch(e){
            setError(e, dispatch);
        }
        finally{
            dispatch(setLoading({ isLoading: false }));
        }
    }
}

export const updateNote = (projectId:string,bugId:string,noteId:string,note:string,closeDialog:any) : AppThunk=> {
    return async (dispatch) => {
        try{
            dispatch(setLoading({ isLoading: true }));
            dispatch(removeError());
            const result = await notesService.editNote(projectId,bugId,noteId,note);
            dispatch(notesSlice.updateNote(result));
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