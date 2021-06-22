import { configureStore, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { ThunkAction } from 'redux-thunk';

import themeReducer from './slices/themeSlice';
import authReducer from './slices/authSlice';
import  notificationReducer from './slices/notificationSlice';
import loadingReducer from './slices/loadingSlice';
import errorReducer from './slices/errorSlice';
import projectsReducer from './slices/projectsSlice';
import usersReducer from './slices/usersSlice';

const store = configureStore({
    reducer:{
        error:errorReducer,
        loading:loadingReducer,
        notification:notificationReducer,
        theme:themeReducer,
        auth:authReducer,
        projects:projectsReducer,
        users:usersReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;