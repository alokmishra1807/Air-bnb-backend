import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/error/app.error";


export const genericErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
        const statusCode =
        Number.isInteger(err.statusCode) ? err.statusCode : 500;

    res.status(statusCode).json({
        success: false,
        message: err.message
    });
}
