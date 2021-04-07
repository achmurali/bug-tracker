import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import asyncHandler from '../middleware/asyncHandler';
import { loginValidator } from '../utils/validators';
import { signupValidator } from '../utils/validators';
import { JWT_SECRET } from '../utils/config';

export const signupUser = async (req:Request,res:Response) => {
    const { username,password,confirmpassword } = req.body;
    const { message,valid } = signupValidator(username,password,confirmpassword);
    
    if(!valid){
        res.status(400).send({message});
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password,saltRounds);

    const token = jwt.sign({
        username: username
    },JWT_SECRET);

    res.status(201).send({
        username:username,
        token
    });
}

export const loginUser = asyncHandler(async (req:Request,res:Response) => {
    const { username, password } = req.body;
    const { message,valid } = loginValidator(username,password);

    if(!valid){
        res.status(400).send({message});
    }



})