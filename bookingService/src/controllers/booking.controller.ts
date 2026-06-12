import { NextFunction, Request, Response } from "express";
import { createBookingService, finalizeBookingService } from "../services/booking.service";




export async function createBookingController(req:Request,res:Response,next:NextFunction){
  const booking =  await createBookingService(req.body);

  return res.status(201).json({
    bookingId:booking.bookingId,
    IdempotencyKey:booking.idempotencyKey,
  })
}



export async function confirmBookingController(req:Request,res:Response,next:NextFunction){
    console.log(req.params.idempotencykey);
  const booking =  await finalizeBookingService(req.params.idempotencykey as string);
   return res.status(201).json({
    bookingId:booking.id,
    status:booking.status,

  })

  
}
