
import IdempotencyKey  from "../db/models/idempotencykey";
import Booking from "../db/models/booking";
import { CreateBookingDTO } from "../dto/booking.dto";


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

export async function getIdempotencykey(key:string){

    
    console.log('key is',key);
    const idempotencykey = await IdempotencyKey.findOne({
        where:{
            idemkey:key
        }
    })

    return idempotencykey;
}

export async function getBookingbyId(bookingId:number){
    const booking = await Booking.findOne({
        where:{
            id:bookingId,
        }
        
    })

    return booking;
}

export async function confirmBooking(bookingId: number) {
  const booking = await Booking.findByPk(bookingId);

  if (!booking) {
    throw new Error("Booking not found");
  }

  booking.status = "CONFIRMED";
  await booking.save();

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

export async function finalizeBooking(key:string){
   const idempotencyKey = await IdempotencyKey.findOne({
    where:{
        idemkey:key
    }
   })

  if (!idempotencyKey) {
    throw new Error("Booking not found");
  }

  idempotencyKey.finalized = true;
  await idempotencyKey.save();

  return idempotencyKey;
}