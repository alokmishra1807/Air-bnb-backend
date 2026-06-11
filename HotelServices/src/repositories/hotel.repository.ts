import logger from "../config/logger.config";
import Hotel from "../db/models/hotel";
import { createHotelDTO } from "../dto/hotel.dto";
import { NotFoundError } from "../utils/error/app.error";

export async function createHotel(hotelData: createHotelDTO) {
  const hotel = await Hotel.create({
    name: hotelData.name,
    address: hotelData.address,
    location: hotelData.location,
    rating: hotelData.rating,
    ratingCount: hotelData.ratingCount,
  });

  logger.info(`Hotel created ${hotel.id}`);
  return hotel;
}

export async function getHotelbyId(id: number) {
  const hotel = await Hotel.findByPk(id);
  console.log(hotel);

  if (!hotel) {
    logger.error(`Hotel with ${id} id not available`);
    throw new NotFoundError(`Noth found hotel with  ${id}`);
  }

  logger.info(`Hotel with given id : ${hotel.id}`);
  return hotel;
}

export async function getAllHotels() {


  const hotels = await Hotel.findAll({
    where:{
        deletedAt:null
    }
  });

  if (!hotels) {
    logger.error("No hotels found");
    throw new NotFoundError("No hotel exists");
  }

  logger.info("List of hotels", hotels);
  return hotels;
}

export async function softDeleteHotelbyId(id: number) {
  const hotel = await Hotel.findByPk(id);

  if (!hotel) {
    logger.error("Hotel does not exist");
    throw new NotFoundError("No hotel exists");
  }

  hotel.deletedAt = new Date();

  await hotel.save();



  logger.info(`deleted hotel with id: ${id}`);
  return hotel;
}


export async function updateHotelbyId(id: number,hotelData: Partial<createHotelDTO>) {
  const hotel = await Hotel.findOne({
  where: {
    id,
    deletedAt: null
  }
});

  if (!hotel) {
    logger.error("Hotel does not exist");
    throw new NotFoundError("No hotel exists");
  }

 

  await hotel.update({
    name:hotelData.name,
     address: hotelData.address,
    location: hotelData.location,
    rating: hotelData.rating,
    ratingCount: hotelData.ratingCount,

  })



  logger.info(`updated hotel with id: ${id}`);
  return hotel;
}
