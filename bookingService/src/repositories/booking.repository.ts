
import IdempotencyKey  from "../db/models/idempotencykey";
import Booking from "../db/models/booking";
import { CreateBookingDTO } from "../dto/booking.dto";
import { Transaction } from "sequelize";



export async function createBooking(bookingData:CreateBookingDTO) {

   

    const booking = await Booking.create({
        UserId:bookingData.userId,
        hotelId:bookingData.hotelId,
        bookingAmount:bookingData.bookingAmount,
        totalGuests:bookingData.totalGuests
       
    })
    return booking;
    
}

export async function createIdempotencyKey(key:string,bookingId:number){
    const idempotencykey = await IdempotencyKey.create({
       idemkey:key,
       finalized:false,
       bookingId:bookingId,

    })

    
    return idempotencykey;
}

export async function getIdempotencykeyWithLock(key:string,t?:Transaction){

    
    
    const idempotencykey = await IdempotencyKey.findOne({
        where:{
            idemkey:key
        },
        transaction:t,
        lock:t?.LOCK.UPDATE,
        
    })

    return (idempotencykey);
}

export async function getBookingbyId(bookingId:number,t?:Transaction){
    const booking = await Booking.findOne({
        where:{
            id:bookingId,
        },
        transaction:t
        
    })

    return booking;
}

export async function confirmBooking(bookingId: number,t?:Transaction) {
  const booking = await Booking.findByPk(bookingId,{
    transaction:t
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  booking.status = "CONFIRMED";
  await booking.save({
    transaction:t
  });

  return booking;
}

export async function cancelBooking(bookingId:number){
   const booking = await Booking.findByPk(bookingId);

  if (!booking) {
    throw new Error("Booking not found");
  }

  booking.status = "CANCELLED";
  await booking.save();

  return booking;
}

export async function finalizeBooking(key:string,t?:Transaction){
    
   const idempotencyKey = await IdempotencyKey.findOne({
    where:{
        idemkey:key
    },
    transaction:t
   })

  if (!idempotencyKey) {
    throw new Error("Booking not found");
  }

  idempotencyKey.finalized = true;
  await idempotencyKey.save({transaction:t});

  return idempotencyKey;
}