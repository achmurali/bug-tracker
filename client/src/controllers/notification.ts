import { sendNotification,clearNotification } from '../redux/slices/notificationSlice';
import { AppThunk } from '../redux/store';

let timeoutId:number = 0; 

const notify = (message:string,type: "success" | "error" ): AppThunk => {
    return (dispatch) => {
        window.clearTimeout(timeoutId);
        dispatch(sendNotification({message,type}));

        timeoutId = window.setTimeout(() => {
            dispatch(clearNotification());
        },6000);
    };
};

export default notify;