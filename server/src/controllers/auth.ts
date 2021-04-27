import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import asyncHandler from '../middleware/asyncHandler';
import { loginValidator,checkRequestBody,signupValidator } from '../utils/validators';
import { JWT_SECRET } from '../utils/config';
import dbConfig from '../db';
import { insertNewUser,checkUsernameExists,getUser as getUserQuery } from '../db/queries/user';
import Exception from '../models/Exception';

export const signupUser = asyncHandler(async (req:Request,res:Response) => {
    const [ username,password,confirmpassword ] = checkRequestBody(req.body,["username","password","confirmpassword"]);
    const { message,valid } = signupValidator(username,password,confirmpassword);
    
    if(!valid){
       throw new Error(message);
    }
    
    await checkUniqueUsernameExists(username);
    
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password,saltRounds);

    const result = await dbConfig.query(insertNewUser,[username,passwordHash])
    if(result.rowCount < 1)
        throw new Error("Try Again Later");

    res.status(201).send({
        success:true
    });
});

const checkUniqueUsernameExists = async (username:string) => {
    const res = await dbConfig.query(checkUsernameExists,[username]);
    if(!res || res.rowCount > 0){
        throw new Error("Username already exists");
    }
}

export const loginUser = asyncHandler(async (req:Request,res:Response) => {
    const [ username, password ] = checkRequestBody(req.body,["username","password"]);
    const { message,valid } = loginValidator(username,password);

    if(!valid){
        throw new Error(message);
    }

    const row = await getUser(username);
    const passwordHash = await bcrypt.compare(password,row.password);

    if(!passwordHash)
        throw new Exception("Wrong Password.Try again",401);
    
    const token = jwt.sign({
        username: username
    },JWT_SECRET);

    res.status(201).send({
        username:username,
        success:true,
        token
    });
});

const getUser = async (username:string) => {
    const res = await dbConfig.query(getUserQuery,[username]);
    if(res.rowCount == 0)
        throw new Exception("Invalid Username, Username doesn't exist",401);
    return res.rows[0];
}