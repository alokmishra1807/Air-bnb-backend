import { Request, Response } from "express";
import logger from "../config/logger.config";

export const pingHandler = (req:Request,res:Response)=>{
    logger.info("Request recieved here");
    res.send("pong");


}