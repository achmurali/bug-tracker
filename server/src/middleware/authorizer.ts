import { isProjectMember as isProjectMemberQuery, checkAdminProject as checkAdminProjectQuery } from '../db/queries/projects';
import { isNoteAdmin } from '../db/queries/note';
import dbConfig from '../db';
import { NextFunction, Request,Response } from 'express';
import Exception from '../models/Exception'


export const authorizer = async (req:Request, _res:Response, next:NextFunction) => {
    const client = await dbConfig.getClient();
    try{
        const resultUser = await client.query(checkAdminProjectQuery,[req.params.projectId,req.user]);
        if(resultUser.rowCount == 1)
            return next();
        const result = await dbConfig.query(isProjectMemberQuery,[req.params.projectId,req.user]);
        if(result.rowCount == 1)
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

export const adminAuthorizer = async (req:Request, _res:Response, next:NextFunction) => {
    const client = await dbConfig.getClient();
    try{
        const resultUser = await client.query(checkAdminProjectQuery,[req.params.projectId,req.user]);
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

export const noteAuthorizer = async (req:Request,_res:Response,next:NextFunction) => {
    try{
    const result = await dbConfig.query(isNoteAdmin,[req.params.bugId,req.params.noteId,req.user]);
    if(result.rowCount == 1)
        return next();
    throw new Exception("Resource doesn't exist or Not Authorized",403);
    }
    catch(err){
       next(err);
    }
}