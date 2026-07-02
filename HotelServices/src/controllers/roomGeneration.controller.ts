import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { addRoomGenerationJobToQueue } from "../producers/roomGeneration.proccessor";


export async function generateRoomHandler(req: Request, res: Response) {

    


   const result = addRoomGenerationJobToQueue(req.body);

    res.status(StatusCodes.OK).json({
        message: "Room generation job added to queue",
        success: true,
        data: result,
    })
}