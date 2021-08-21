import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface InitialNotesState {
    notes: any | null;
}

const initialState : InitialNotesState = {
    notes: null
}

const notesSlice = createSlice({
    name:'notes',
    initialState,
    reducers: {
        setNotes: (state, action:PayloadAction<any[]>) => {
            state.notes = action.payload;
        },
        addNote: (state,action:PayloadAction<any>) => {
            state.notes.push(action.payload);
        },
        removeNote: (state,action:PayloadAction<string>) => {
            state.notes.filter((note:any) => note.noteid !== action.payload);
        },
        updateNote: (state,action:PayloadAction<any>) => {
            state.notes.filter((note:any) => note.noteid !== action.payload.noteid ? note : action.payload);
        },
        removeNotes: (state) => {
            state.notes = null;
        }
    }
});

export const {
    setNotes,
    addNote,
    removeNote,
    updateNote,
    removeNotes
} = notesSlice.actions;

export const selectNotesState = (state: RootState) => state.notes;

export default notesSlice.reducer;
