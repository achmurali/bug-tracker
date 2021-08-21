import { Request,Response } from 'express';
import { v4 as uuid } from 'uuid';

import asyncHandler from '../middleware/asyncHandler';
import dbConfig from '../db';
import { checkRequestBody, addProjectValidator } from '../utils/validators';
import {
  getAllProjects as getAllProjectsQuery,
  getProject as getProjectQuery,
  addProject as addProjectQuery,
  addProjectMembers as addProjectMembersQuery,
  updateProjectName as updateProjectNameQuery,
  deleteProjectMember,
  deleteProject as deleteProjectQuery,
  getProjectMembers as getProjectMembersQuery,
  updateTimestamp
} from "../db/queries/projects";
import Exception from '../models/Exception';
import { IProjectResult } from '../models/Project';
import { getAllBugs } from '../db/queries/bug';

export const getAllProjects = asyncHandler(async (req:Request,res:Response) => {
    const result = await dbConfig.query(getAllProjectsQuery,[req.user]);
    res.json({
        data:result.rows,
        success:true
    });
});

export const getProjectHandler = asyncHandler(async (req:Request,res:Response) => {
    const id = req.params.projectId;
    const result: IProjectResult = {
        project:[],
        members:[],
        bugs:[]
    };
    let row = await getProject(id);
    if(!result)
        throw new Exception("Project Doesn't Exist",404,false);
    
    result.project.push(row);

    let members = await dbConfig.query(getProjectMembersQuery,[id]);
    result.members = members.rows;

    let bugs = await dbConfig.query(getAllBugs,[id]);
    result.bugs = bugs.rows;

    res.json({
        data:result,
        success:true});
});

export const getProjectMembers = asyncHandler(async (req:Request,res:Response) => {
    const id = req.params.projectId;
    let members = await dbConfig.query(getProjectMembersQuery,[id]);
    res.json({
        data:members.rows,
        success:true
    });
});

export const addProject = asyncHandler(async(req:Request,res:Response) => {
    const [ name,members ] = checkRequestBody(req.body,["name","members"]);

    addProjectValidator(name,members);
    const client = await dbConfig.getClient();
    let response:any = {}

    const id = uuid();
    const admin = +req.user;

    //@ts-ignore
    const projectAddResult = await client.query(addProjectQuery,[id,name,admin]);
    response = projectAddResult.rows[0];
    if(projectAddResult.rowCount != 1)
        throw new Exception("Internal Server Error", 500);

    response.members = [];
    await Promise.all(members.map(async (ele:string) => {
        const result = await client.query(addProjectMembersQuery,[id,+ele]);
        console.log(result);
        response.members.push(result.rows[0]);
    })).catch(e => {
        client.release();
        throw new Exception(e,500);
    });
    
    client.release();

    response.bugs = 0;
    response.admin = req.user;
    response.members = response.members.length;
    res.status(201).json({
        data:response,
        success:true
    });
});

export const updateProject = asyncHandler(async(req:Request,res:Response) => {
    const condition = req.query.condition ?? null;
    let result;
    if(!condition)
        throw new Error("Bad Request");

    let date = new Date();    
    const id = req.params.projectId; 

    await dbConfig.query(updateTimestamp,[date,id]);    

    if(condition === "name"){
        const [name] = checkRequestBody(req.body,["name"]);
        result = await dbConfig.query(updateProjectNameQuery,[name,id]);
        if(result.rowCount != 1)
            throw new Exception("Project doesn't exist",404,false);       
    }
    else if(condition === "member"){
        const [member] = checkRequestBody(req.body,["member"]);
        
        if(member ===  req.user)
            throw new Exception("Admin is already part of the project",400);

        result = await dbConfig.query(addProjectMembersQuery, [id,+member]);
        if(result.rowCount != 1)
            throw new Exception("Member doesn't exist for this project",404,false);
    }
    else if(condition === "delete"){
        const [member] = checkRequestBody(req.body,["member"]);
        result = await dbConfig.query(deleteProjectMember,[id,+member]);
        if(result.rowCount == 0)
            throw new Exception("Member doesn't exist for this project",404,false); 
    }
    else{
        throw new Error();
    }

    res.status(200).json({
        data:result.rows[0],
        success:true
    });
});

export const deleteProject = asyncHandler(async(req:Request,res:Response) => {
    const id = req.params.projectId;
    const result = await dbConfig.query(deleteProjectQuery,[id]);
    if(result.rowCount == 0)
        throw new Exception("Internal Server Error",500);
    res.status(200).send({
        data:result.rows,
        success:true
    });
});

//Utility Methods
export const getProject = async (id:string) => {
    const result = await dbConfig.query(getProjectQuery,[id]);
    if(result.rowCount != 1)
        return null;
    return result.rows[0];
};