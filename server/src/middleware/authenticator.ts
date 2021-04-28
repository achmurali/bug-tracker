import { NextFunction, Request,Response } from 'express';
import jwt from 'jsonwebtoken';

import Exception from '../models/Exception'
import { JWT_SECRET } from '../utils/config';

interface IToken {
    id:string,
    username:string
}

const authenticator = (req:Request, res:Response,next:NextFunction) => {
    try
    {
        const token = req.header('x-auth-token');
        if(!token)
            throw new Exception("Not Authorized. Please Login again",401);
    
        const verifiedToken = jwt.verify(token,JWT_SECRET) as IToken;
        if(!verifiedToken.id)
            throw new Error();
        req.user = verifiedToken.id;
        next();
    }
    catch{
        throw new Exception("Not Authorized. Please Login again",401);
    }
};

export default authenticator;