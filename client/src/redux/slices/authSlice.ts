import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserData as UserState } from '../../models/auth';
import { RootState } from '../store';

interface InitialAuthState {
    user: UserState | null;
}

const initialState : InitialAuthState = {
    user:null,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setUser: (state, action:PayloadAction<UserState>) => {
            state.user = action.payload;
        },
        removeUser: (state) => {
            state.user = null;
        }
    }
});

export const {
    setUser,
    removeUser
} = authSlice.actions;

export const selectAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;
