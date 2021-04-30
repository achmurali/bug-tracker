import { Request, Response } from 'express';

const unknownEndpointHandler = (_req:Request,res:Response) => {
    return res.status(404).send({
        message:"Unknown end-point"
    })
};

export default unknownEndpointHandler;