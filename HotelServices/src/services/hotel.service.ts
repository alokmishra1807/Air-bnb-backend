import { createHotelDTO } from "../dto/hotel.dto";
import { HotelRepository } from "../repositories/hotel.repository";


const hotelRepository = new HotelRepository();


export async function createHotelService(hotelData : createHotelDTO) {
    const hotel = await hotelRepository.create(hotelData);
    return hotel;
    
}

export async function getHotelbyIdService(id:number) {
    const hotel = await hotelRepository.findById(id);
    return hotel;
    
}

export async function getAllHotelService() {
    const hotel = await hotelRepository.findAll();
    return hotel;
    
}


export async function deleteHotelbyIdService(id:number) {
    const hotel = await hotelRepository.softDelete(id);
    return hotel;
    
}

export async function updateHotelbyIdService(id:number,hotelData:Partial<createHotelDTO>) {
    const hotel = await hotelRepository.update(id,hotelData);
    return hotel;
    
}