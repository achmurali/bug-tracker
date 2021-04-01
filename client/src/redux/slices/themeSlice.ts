import { createSlice } from '@reduxjs/toolkit';

interface IInitialState{
    darkmode:boolean
}

const initialState:IInitialState = {
    darkmode:false
};

const themeSlice = createSlice({
    name:"theme",
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.darkmode = !state.darkmode
        }
    }
});

export const {toggleDarkMode} = themeSlice.actions;

export default themeSlice.reducer;