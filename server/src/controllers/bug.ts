import { Request, Response } from "express";
import { v4 as uuid } from "uuid";

import asyncHandler from "../middleware/asyncHandler";
import dbConfig from "../db";
import {
  addBug as addBugQuery,
  addBugDetails as addBugDetailsQuery,
  getAllBugs as getAllBugsQuery,
  deleteBug as deleteBugQuery,
  getBug as getBugQuery,
  getBugDetails as getBugDetailsQuery,
  updateBugDetails as updateBugDetailsQuery
} from "../db/queries/bug";
import { checkRequestBody } from "../utils/validators";
import Exception from "../models/Exception";
import { Status, Priority } from '../models/Bugs'; 

export const getAllBugs = asyncHandler(async (req: Request, res: Response) => {
  const projectId = req.params.projectId;
  const result = await dbConfig.query(getAllBugsQuery, [projectId]);
  res.status(200).json({
    data: result.rows,
    success: true,
  });
});

export const addBug = asyncHandler(async (req: Request, res: Response) => {
  const projectId = req.params.projectId;
  let [name, description, status, priority] = checkRequestBody(req.body, ["name","description","status","priority",]);
  const client = await dbConfig.getClient();
  try {
    const bugId = uuid();
    const result = await client.query(addBugQuery, [projectId,req.user,bugId,]);
    
    if (result.rowCount != 1)
      throw new Exception("Something went wrong", 500);
    
    priority = getPriorityEnum(priority);
    status = getStatusEnum(status);
    const resultDetails = await client.query(addBugDetailsQuery, [bugId,name,description,req.user,priority,status]);
    
    if (resultDetails.rowCount != 1)
      throw new Exception("Something went wrong", 500);
    
    res.status(201).json({
      bug: result.rows,
      bugDetails: resultDetails.rows,
      success:true
    });
    }
    catch (err) {
      throw new Exception(err, 500);
    } 
    finally {
      client.release();
    }
});

export const deleteBug = asyncHandler(async (req: Request, res: Response) => {
  const [projectId, bugId] = [req.params.projectId, req.params.bugId];
  const result = await dbConfig.query(deleteBugQuery, [projectId, bugId]);

  res.status(200).json({
    data: result.rows,
    success: true,
  });
});

export const getBug = asyncHandler(async (req: Request, res: Response) => {
  const [ projectId, bugId ] = [ req.params.projectId, req.params.bugId];
  const result = await dbConfig.query(getBugQuery,[projectId,bugId]);
  if(result.rowCount > 1)
    throw new Exception("Something went wrong",500);
  res.status(200).json({
      data:result.rows[0],
      success:true
  })
});

export const updateBug = asyncHandler(async (req: Request, res: Response) => {
    const [projectId,bugId] = [req.params.projectId,req.params.bugId];
    const bugDetails = await dbConfig.query(getBugDetailsQuery,[projectId,bugId]);
    if(bugDetails.rowCount != 1)
      throw new Exception("Something went wrong",500);
    const newValues = updateValues(req.body,bugDetails.rows[0],req.user);  
    const result = await dbConfig.query(updateBugDetailsQuery,[newValues.name,newValues.description,newValues.updatedBy,newValues.priority,
                                          newValues.status,newValues.updatedTimestamp]);
    if(result.rowCount < 1)
      throw new Exception("Something went wrong",500);
    res.status(200).json({
      data:result.rows[0],
      success:true
    });
});

const updateValues = (body:any,row:any,user:number) => {
    let newValues:any = {};
    newValues.name = body.name??row.name;
    newValues.description = body.description??row.description;
    newValues.priority = getPriorityEnum(body.priority??row.priority);
    newValues.status = getStatusEnum(body.status??row.status);
    newValues.updatedtimestamp = new Date();
    newValues.updatedBy = user;
    return newValues;
}

const getStatusEnum = (status:string) => {
  switch(status){
    case "Close": return Status.CLOSE;
    case "Open" : return Status.OPEN;
    case "Idle" : return Status.IDLE;
    default: throw new Exception("Bad Request",400);
  }
};

const getPriorityEnum = (priority:string) => {
  switch(priority){
    case "High": return Priority.HIGH;
    case "Medium": return Priority.MEDIUM;
    case "Low": return Priority.LOW;
    default: throw new Exception("Bad Request",400);
  }
}