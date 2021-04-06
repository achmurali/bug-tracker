import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { loginValidator } from '../utils/validators';
import { signupValidator } from '../utils/validators';

export const signupUser = async (req:Request,res:Response) => {
    const { username,password,confirmpassword } = req.body;
    const { message } = signupValidator(username,password,confirmpassword);
}

export const loginUser = async (req:Request,res:Response) => {
    const { username, password } = req.body;
    const {errors,valid} = loginValidator(username,password);

    if(!valid){
        res.status(400).send({message:Object.values(errors)[0]});
    }



}