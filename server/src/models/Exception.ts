export interface IException extends Error{
    errorType?:boolean,
    status:number;
}

export default class Exception extends Error implements IException {
    errorType?: boolean;
    status: number;

    constructor(message:string,status?:number,errorType?:boolean){
        super(message);
        this.errorType = errorType ?? true;
        this.status = status ?? 400;
    }
}