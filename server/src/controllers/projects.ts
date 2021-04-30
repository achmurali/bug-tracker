import { Request,Response } from 'express';
import { v4 as uuid } from 'uuid';

import asyncHandler from '../middleware/asyncHandler';
import dbConfig from '../db';
import { checkRequestBody, addProjectValidator } from '../utils/validators';
import { getAllProjects as getAllProjectsQuery, getProject as getProjectQuery, addProject as addProjectQuery } from '../db/queries/projects';
import Exception from '../models/Exception';

export const getAllProjects = asyncHandler(async (_req:Request,res:Response) => {
    const result = await dbConfig.query(getAllProjectsQuery,[]);
    res.json(result);
});

export const getProjectHandler = asyncHandler(async (req:Request,res:Response) => {
    const result = await getProject(req.params.id);
    if(!result)
        throw new Error("Invalid Project");
    res.json(result);
}); 

export const getProject = async (id:string) => {
    const result = await dbConfig.query(getProjectQuery,[id]);
    if(result.rowCount != 1)
        return null;
    return result.rows[0];
};

export const addProject = asyncHandler(async(req:Request,res:Response) => {
    const [ name,members ] = checkRequestBody(req.body,["name","members"]);

    addProjectValidator(name,members);
    const client = dbConfig.getClient();

    const id = uuid();
    const admin = +req.user;


    const result = await dbConfig.query(addProjectQuery,[id,name,admin]);



    if(result.rowCount != 1)
        throw new Exception("Internal Server Error",500);
    
    res.status(201).send({
        success:true
    });
});