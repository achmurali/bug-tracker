import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

interface initialState {
    project:any | null
}

const initialState : initialState = {
    project: null
}

const projectSlice = createSlice({
    name:"project",
    initialState,
    reducers:{
        setProject:(state, action:PayloadAction<any>) => {
            state.project = action.payload;
        },
        removeProject:(state) => {
            state.project = null
        },
        addBug:(state,action:PayloadAction<any>) => {
            state.project.bugs.push(action.payload);
        },
        deleteBug:(state,action:PayloadAction<string>) => {
            state.project.bugs = state.project.bugs.filter((bug:any) => bug.bug_id !== action.payload);
        },
        updateBug:(state,action:PayloadAction<any>) => {
            state.project.bugs = state.project.bugs.filter((bug:any) => bug.bug_id !== action.payload.bug_id ? bug : action.payload );
        }
    }
});

export const {
    setProject,
    removeProject,
    addBug,
    deleteBug,
    updateBug 
} = projectSlice.actions;

export const selectProjectState = (state: RootState) => state.project;

export default projectSlice.reducer;