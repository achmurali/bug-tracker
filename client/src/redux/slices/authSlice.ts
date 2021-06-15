import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserState } from '../models';

interface InitialAuthState {
    user: UserState | null;
    loading: boolean;
    error: string | null;
}

const initialState : InitialAuthState = {
    user:null,
    loading:false,
    error:null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setUser: (state, action:PayloadAction<UserState>) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        removeUser: (state) => {
            state.user = null;
        },
        setAuthLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        setAuthError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearAuthError: (state) => {
            state.error = null;
        }
    }
});

export const {
    setUser,
    removeUser,
    setAuthLoading,
    setAuthError,
    clearAuthError,
} = authSlice.actions;

