import { Request,Response } from 'express';

import asyncHandler from '../middleware/asyncHandler';
import dbConfig from '../db';
import { checkRequestBody } from '../utils/validators';
import { getAllProjects as getAllProjectsQuery, getProject as getProjectQuery } from '../db/queries/projects';

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
    const [ name, admin ] = checkRequestBody(req.body,["name","admin"]);
    
})