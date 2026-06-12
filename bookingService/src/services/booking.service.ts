import { CreateBookingDTO } from "../dto/booking.dto";
import { createBooking, createIdempotencyKey, confirmBooking, getIdempotencykey, finalizeBooking } from "../repositories/booking.repository";
import { InternalServerError, NotFoundError } from "../utils/error/app.error";

import { generateIdempotencyKey } from "../utils/generateIdempotencyKey";



export async function createBookingService(CreateBookingDTO:CreateBookingDTO){

    const booking = await createBooking({
        userId:CreateBookingDTO.userId,
        hotelId:CreateBookingDTO.hotelId,
        totalGuests:CreateBookingDTO.totalGuests,
        bookingAmount:CreateBookingDTO.bookingAmount
        
    })

    console.log("parsed body");

    const idempotencyKey =  generateIdempotencyKey();

    console.log("before",idempotencyKey);
    await createIdempotencyKey(idempotencyKey,booking.id);

    console.log("done");

    console.log(booking.id,idempotencyKey);

     return {
            bookingId: booking.id,
            idempotencyKey: idempotencyKey,
        };
    
}

export async function finalizeBookingService(idempotencyKey:string){
    const idempotencyKeyData = await getIdempotencykey(idempotencyKey);

    if(!idempotencyKeyData){
        throw new NotFoundError('Idempotency key not found');
    }

    if(idempotencyKeyData.finalized){
        throw new InternalServerError('Idempotency key already finalized');
    }

    const booking =await confirmBooking(idempotencyKeyData.bookingId);

    

    await finalizeBooking(idempotencyKey);

    return booking;

}