import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoading } from "../../models/loading";
import { RootState } from "../store";

const initialState: ILoading = {
    isLoading: false
}

const loadingSlice = createSlice({
    name:'loading',
    initialState,
    reducers:{
        setLoading:(state,action: PayloadAction<ILoading>) => {
            state.isLoading = action.payload.isLoading;
        }
    }
})

export const { setLoading } = loadingSlice.actions;

export const selectLoadingState = (state:RootState) => state.loading;

export default loadingSlice.reducer;