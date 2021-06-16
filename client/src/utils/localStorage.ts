import { UserData as UserState } from '../models/auth';

const storageKeyAuth = "BugTrackerAuthTokenKey";
const storageKeyTheme = "BugTrackerThemeKey";

export const saveUser = (userData : UserState) => {
    localStorage.setItem(storageKeyAuth, JSON.stringify(userData));
}

export const getUser = () => {
    const data = localStorage.getItem(storageKeyAuth); 
    return data ? JSON.parse(data) : null;
}

export const removeUser = () => localStorage.removeItem(storageKeyAuth);

export const saveDarkmode = (flag:boolean) => localStorage.setItem(storageKeyTheme,String(flag));

export const getDarkmode = () => Boolean(localStorage.getItem(storageKeyTheme));