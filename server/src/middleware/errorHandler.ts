import { Request,Response,NextFunction } from 'express';
import { HttpError } from 'http-errors';
import { IException } from '../models/Exception'


const errorHandler = (error:HttpError|IException,_req:Request,res:Response,next:NextFunction) => {
    error.status = error.status ?? 400;
    error.message = error.message ?? "Something Went Wrong";
    res.status(error.status).json({
        message:error.message,
        stack:error.stack,
        success:false
    })

    next(error);
}

export const errorLogger = (err:HttpError,_req:Request,_res:Response,next:NextFunction) => {
    console.log("Error status : " + err.status);
    console.log("Error message : " + err.message);
    next(err);
};

export default errorHandler;