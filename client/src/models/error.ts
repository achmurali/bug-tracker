export interface IError {
    message : string | null;
    additionalInfo?: object | null
}

export class MyError extends Error {
    constructor(message:string,stack?:string){
        super(message);
        this.stack = stack
    }
}