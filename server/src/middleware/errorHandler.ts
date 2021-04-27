import { Request,Response,NextFunction } from 'express';
import { HttpError } from 'http-errors';


const errorHandler = (error:HttpError,_req:Request,res:Response,next:NextFunction) => {
    console.log(error);
//     if (error.name === 'JsonWebTokenError') {
//     return res.status(401).send({ message: 'Invalid token.' });
//   } else if (error.message) {
//     return res.status(400).send({ message: error.message });
//   } else {
//     res.status(400).send({ message: 'Something went wrong.' });
//   }
    res.status(error.status).json({
        message:error.message,
        stack:error.stack,
        status:error.status
    })

    next(error);
}

export const errorLogger = (err:HttpError,_req:Request,_res:Response,next:NextFunction) => {
    console.log("Error status : " + err.status);
    console.log("Error message : " + err.message);
    next(err);
};

export default errorHandler;