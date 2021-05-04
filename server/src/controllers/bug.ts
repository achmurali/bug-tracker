import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

import asyncHandler from '../middleware/asyncHandler';
import dbConfig from '../db';
import { addBug as addBugQuery,addBugDetails as addBugDetailsQuery, getAllBugs as getAllBugsQuery } from '../db/queries/bug'
import { checkRequestBody } from '../utils/validators';
import Exception from '../models/Exception';

export const getAllBugs = asyncHandler(async (req:Request,res:Response) => {
    const projectId = req.params.projectId;
    const result = await dbConfig.query(getAllBugsQuery,[projectId]);
    res.status(200).json({
        data:result.rows,
        success:true
    });
});

export const addBug = asyncHandler(async (req:Request,res:Response) => {
    const projectId = req.params.projectId;
    const [ name,description,status,priority ] = checkRequestBody(req.body,["name","description","status","priority"]);
    const client = await dbConfig.getClient();
    try{
        const bugId = uuid();
        const result = await client.query(addBugQuery,[projectId,req.user,bugId]);
        const now = new Date();
        if(result.rowCount != 1)
            throw new Exception("Something went wrong",500);
        const resultDetails = await client.query(addBugDetailsQuery,[bugId,name,description,req.user,priority,status,now]);
        if(resultDetails.rowCount != 1)
            throw new Exception("Something went wrong",500);    
        res.status(201).json({
            bug:result.rows,
            bugDetails:resultDetails
        });
    }
    catch(err){
        throw new Exception(err,500);
    }
    finally{
        client.release();
    }
});

export const deleteBug = asyncHandler(async (_req:Request,res:Response) => {
    res.status(200).end();
});

export const getBug = asyncHandler(async (_req:Request,res:Response) => {
    res.status(200).end();
});

export const updateBug = asyncHandler(async (_req:Request,res:Response) => {
    res.status(200).end();
});
