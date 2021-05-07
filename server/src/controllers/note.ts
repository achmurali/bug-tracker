import { Request,Response } from 'express';
import { v4 as uuid } from 'uuid';

import asyncHandler from '../middleware/asyncHandler';
import dbConfig from '../db';
import * as noteQueries from '../db/queries/note';
import Exception from '../models/Exception';
import { checkRequestBody } from '../utils/validators';

export const getAllNotes = asyncHandler(async (req:Request,res:Response) => {
    const bugId  = req.params.bugId; 
    const result = await dbConfig.query(noteQueries.getAllNotes,[bugId]);
    res.status(200).json({
        data:result.rows,
        success:true
    });
});

export const getNote = asyncHandler(async (req:Request,res:Response) => {
    const [bugId,noteId] = [req.params.bugId,req.params.noteId];
    const result = await dbConfig.query(noteQueries.getNote,[bugId,noteId]);
    res.status(200).json({
        data:result.rows,
        success:true
    });
});

export const addNote = asyncHandler(async (req:Request,res:Response) => {
    const bugId = req.params.bugId;
    const userId = req.user;
    const [note] = checkRequestBody(req.body,["note"]);
    const noteId = uuid();
    const result = await dbConfig.query(noteQueries.addNote,[bugId,note,userId,noteId]);
    if(result.rowCount != 1)
        throw new Exception("Something went wrong",500);
    res.status(201).json({
        data:result.rows,
        success:true
    });
});

export const updateNote = asyncHandler(async (req:Request,res:Response) => {
    const [ bugId,noteId ] = [req.params.bugId,req.params.noteId];
    const [note] = checkRequestBody(req.body,["note"]);
    const result = await dbConfig.query(noteQueries.updateNote,[note,new Date(),bugId,noteId])
    if(result.rowCount != 1)
        throw new Exception("Something Went Wrong",500);
    res.status(201).json({
        data:result.rows,
        success:true
    });
});

export const deleteNote = asyncHandler(async (req:Request,res:Response) => {
    const [ bugId, noteId ] = [req.params.bugId,req.params.noteId];
    const result = await dbConfig.query(noteQueries.deleteNote,[bugId,noteId]);
    if(result.rowCount != 1)
        throw new Exception("Something went wrong",500);
    res.status(200).json({
        data:result.rows,
        success:true
    }) 
});