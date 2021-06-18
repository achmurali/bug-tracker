import { UserData as UserState } from '../models/auth';

const storageKeyAuth = "BugTrackerAuthTokenKey";
const storageKeyTheme = "BugTrackerThemeKey";

export const saveUser = (userData : UserState) => {
    const date = new Date();
    let userWithExpiry = {...userData,expiry : date.getTime() + 1800000 }
    localStorage.setItem(storageKeyAuth, JSON.stringify(userWithExpiry));
}

export const getUser = () => {
    const data = localStorage.getItem(storageKeyAuth); 
    if(!data)
        return null;

    const { expiry, ...userData } = JSON.parse(data);
    const now = new Date();

    if(now.getTime() > expiry)
        return userData;
    return null;
}

export const removeUser = () => localStorage.removeItem(storageKeyAuth);

export const saveDarkmode = (flag:boolean) => localStorage.setItem(storageKeyTheme,String(flag));

export const getDarkmode = () => Boolean(localStorage.getItem(storageKeyTheme));