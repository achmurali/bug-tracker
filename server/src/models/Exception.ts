export interface IException extends Error{
    type?:string,
    status:number;
}

export default class Exception extends Error implements IException {
    type?: string;
    status: number;

    constructor(message:string,status?:number,type?:string){
        super(message);
        this.type = type;
        this.status = status ?? 400;
    }
}