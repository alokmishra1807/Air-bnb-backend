import { createHotelDTO } from "../dto/hotel.dto";
import { createHotel,getAllHotels,getHotelbyId, softDeleteHotelbyId, updateHotelbyId } from "../repositories/hotel.repository";


export async function createHotelService(hotelData : createHotelDTO) {
    const hotel = await createHotel(hotelData);
    return hotel;
    
}

export async function getHotelbyIdService(id:number) {
    const hotel = await getHotelbyId(id);
    return hotel;
    
}

export async function getAllHotelService() {
    const hotel = await getAllHotels();
    return hotel;
    
}


export async function deleteHotelbyIdService(id:number) {
    const hotel = await softDeleteHotelbyId(id);
    return hotel;
    
}

export async function updateHotelbyIdService(id:number,hotelData:Partial<createHotelDTO>) {
    const hotel = await updateHotelbyId(id,hotelData);
    return hotel;
    
}