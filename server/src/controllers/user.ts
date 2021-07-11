import { Request, Response } from 'express';

import asyncHandler from "../middleware/asyncHandler";
import dbConfig from '../db';
import { getAllUsers as getAllUsersQuery } from '../db/queries/user';

export const getAllUsers = asyncHandler(async (req:Request,res:Response) => {
    const result = await dbConfig.query(getAllUsersQuery,[req.user]);
    res.status(200).json({
        data:result.rows,
        success:true
    })
});