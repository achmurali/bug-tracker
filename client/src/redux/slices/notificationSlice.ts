import { createSlice,PayloadAction } from '@reduxjs/toolkit';

import { NotificationState } from '../../models/notification'; 
import { RootState } from '../store';

const initialState:NotificationState = {
    message: null,
    type: null
};

const notificationSlice = createSlice({
    name:'notification',
    initialState,
    reducers:{
        sendNotification: (state, action:PayloadAction<NotificationState>) => {
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        clearNotification: (state) => {
            state.message = null;
            state.type = null;
        }
    }
})

export const { sendNotification,clearNotification } = notificationSlice.actions;

export const selectNotificationState = (state:RootState) => state.notification;

export default notificationSlice.reducer;