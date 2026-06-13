import { serverConfig } from "../config";
import { redlock } from "../config/redis.config";
import sequelize from "../db/models/sequelize";
import { CreateBookingDTO } from "../dto/booking.dto";
import { createBooking, createIdempotencyKey, confirmBooking, finalizeBooking, getIdempotencykeyWithLock } from "../repositories/booking.repository";
import { InternalServerError, NotFoundError } from "../utils/error/app.error";

import { generateIdempotencyKey } from "../utils/generateIdempotencyKey";



export async function createBookingService(CreateBookingDTO:CreateBookingDTO){

     const ttl = serverConfig.LOCK;
    const bookingResource = `hotel:${CreateBookingDTO.hotelId}`;

    try {
        await redlock.acquire([bookingResource],ttl);
         const booking = await createBooking({
        userId:CreateBookingDTO.userId,
        hotelId:CreateBookingDTO.hotelId,
        totalGuests:CreateBookingDTO.totalGuests,
        bookingAmount:CreateBookingDTO.bookingAmount
        
    })
    // console.log("parsed body");
    const idempotencyKey =  generateIdempotencyKey();
    // console.log("before",idempotencyKey);
    await createIdempotencyKey(idempotencyKey,booking.id);
    // console.log("done");
    // console.log(booking.id,idempotencyKey);
    return {
            bookingId: booking.id,
            idempotencyKey: idempotencyKey,
        };
    } catch (error) {
        throw new InternalServerError("Failed to acquire lock for booking services"); 
    }
}

export async function finalizeBookingService(idempotencyKey:string){
    const t = await sequelize.transaction();
    try {
         const idempotencyKeyData = await getIdempotencykeyWithLock(idempotencyKey,t);

    if(!idempotencyKeyData){
        throw new NotFoundError('Idempotency key not found');
    }

    if(idempotencyKeyData.finalized){
        throw new InternalServerError('Idempotency key already finalized');
    }

    const booking =await confirmBooking(idempotencyKeyData.bookingId,t);

    

    await finalizeBooking(idempotencyKey,t);

    await t.commit();

    return booking;

    
        
    } catch (error) {
       await t.rollback();
     throw new InternalServerError("error in transaction");
        
    }
   

}