import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IError } from "../../models/error";
import { RootState } from "../store";

const initialState : IError = {
    message:null
};

const errorSlice = createSlice({
    name:'error',
    initialState,
    reducers: {
        addError: (state,action:PayloadAction<IError>) => {
            state.message = action.payload.message;
            state.additionalInfo = action.payload.additionalInfo;
        },
        removeError: (state) => {
            state.message = null;
            state.additionalInfo = null;
        }
    }
})

export const { addError, removeError } = errorSlice.actions;

export const selectErrorState = (state:RootState) => state.error;

export default errorSlice.reducer;