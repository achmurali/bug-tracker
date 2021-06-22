export interface ICredentials {
    username:string;
    password:string;
    confirmpassword?:string
}

export interface UserData {
    id: any;
    username: string;
    token: string
}

export interface User {
    id: string;
    username: string;
}