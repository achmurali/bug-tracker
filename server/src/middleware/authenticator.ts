import { NextFunction, Request,Response } from 'express';
import jwt from 'jsonwebtoken';
import dbConfig from '../db';

import Exception from '../models/Exception'
import { JWT_SECRET } from '../utils/config';
import { isProjectMember as isProjectMemberQuery, checkAdminProject as checkAdminProjectQuery } from '../db/queries/projects';

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
        req.user = +verifiedToken.id;
        next();
    }
    catch{
        throw new Exception("Not Authorized. Please Login again",401);
    }
};

export const authorizer = async (req:Request, _res:Response, next:NextFunction) => {
    const client = await dbConfig.getClient();
    try{
        const resultUser = await client.query(checkAdminProjectQuery,[req.params.projectId,req.user]);
        if(resultUser.rowCount == 1)
            return next();
        const result = await dbConfig.query(isProjectMemberQuery,[req.params.projectId,req.user]);
        if(result.rowCount == 1)
            return next();
        throw new Exception("Not Authorized",403);
    }
    catch(err){
        next(err);
    }
    finally{
        client.release();
    }
}; 

export const adminAuthorizer = async (req:Request, _res:Response, next:NextFunction) => {
    const client = await dbConfig.getClient();
    try{
        const resultUser = await client.query(checkAdminProjectQuery,[req.params.id,req.user]);
        if(resultUser.rowCount == 1)
            return next();
        throw new Exception("Resource doesn't exist or Not Authorized",403);
    }
    catch(err){
        next(err);
    }
    finally{
        client.release();
    }
};  

export default authenticator;