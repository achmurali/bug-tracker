import { configureStore, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { ThunkAction } from 'redux-thunk';

import themeReducer from './slices/themeSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
    reducer:{
        theme:themeReducer,
        auth:authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;