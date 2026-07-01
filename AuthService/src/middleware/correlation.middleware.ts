import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { asyncLocalStorage } from "../utils/helpers/request.helper";


export const attachCorrelationMiddleware = async(req : Request, res: Response,next : NextFunction)=>{

    const correlationId = uuidv4();
    console.log(correlationId);

      req.headers['x-correlation-id'] = correlationId;

    // Call the next middleware or route handler

    asyncLocalStorage.run( { correlationId: correlationId } , () => {
        next();

    })
}