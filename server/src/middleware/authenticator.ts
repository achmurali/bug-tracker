import { NextFunction, Request,Response } from 'express';
import jwt from 'jsonwebtoken';
import dbConfig from '../db';

import Exception from '../models/Exception'
import { JWT_SECRET } from '../utils/config';
import { isProjectMember as isProjectMemberQuery } from '../db/queries/projects';

interface IToken {
    id:number,
    username:string
}

const authenticator = (req:Request, _res:Response,next:NextFunction) => {
    try
    {
        const token = req.header('x-auth-token');
        if(!token)
            throw new Exception("Not Authorized. Please Login again",401);
    
        const verifiedToken = jwt.verify(token,JWT_SECRET) as IToken;
        if(!verifiedToken.id)
            throw new Error();
        console.log()
        req.user = +verifiedToken.id;
        next();
    }
    catch{
        throw new Exception("Not Authorized. Please Login again",401);
    }
};

export const authorizer = async (req:Request, _res:Response, next:NextFunction) => {
    try{
        const result = await dbConfig.query(isProjectMemberQuery,[req.params.projectId,req.user]);
        if(result.rowCount < 1)
            next(new Exception("Not Authorized",403));

    }
    catch(err){
        next(err);
    }
}; 

export default authenticator;