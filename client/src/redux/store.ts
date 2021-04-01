import { configureStore, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import themeReducer from './slices/themeSlice';

const store = configureStore({
    reducer:{
        theme:themeReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export type RootState = ReturnType<typeof store.getState>;

export default store;