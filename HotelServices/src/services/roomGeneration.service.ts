import { CreationAttributes } from "sequelize";
import logger from "../config/logger.config";
import { RoomGenerationJob } from "../dto/roomGeneration.dto";
import { RoomReository } from "../repositories/room.repository";
import { RoomCategoryRepository } from "../repositories/roomCategory.repository";
import { BadRequestError, NotFoundError } from "../utils/error/app.error";
import Room from "../db/models/rooms";
import RoomCategory from "../db/models/roomCategory";

const roomCategoryRepository = new RoomCategoryRepository();

const roomRepository = new RoomReository();

export async function generateRooms(roomData: RoomGenerationJob) {
  let totalRoomsCreated = 0;
  let totalDatesProcessed = 0;

  // console.log("service here")

  const roomCategory = await roomCategoryRepository.findById(
    roomData.roomCategoryId,
  );

  if (!roomCategory) {
    logger.error(`room category eith id ${roomData.roomCategoryId} not found`);
    throw new NotFoundError(
      `room category eith id ${roomData.roomCategoryId} not found`,
    );
  }

  const startDate = new Date(roomData.startDate);
  const endDate = new Date(roomData.endDate);

  if (startDate >= endDate) {
    logger.error(`start date must be before end date`);
    throw new BadRequestError("start date must be before end date");
  }

  if (startDate < new Date()) {
    logger.error(`start date must be int the future`);
    throw new BadRequestError("start date must be in the future");
  }

  const totalDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  //get Time gives Epoch Milliseconds which total time in millisecond from 1 jan 1970.

  logger.info(`Generating rooms for ${totalDays} days`);

  const batchSize = roomData.batchSize || 100;

  const currentDate = new Date(startDate);

  //  if this const currentDate = startDate; then
  // both variables would point to the same object and changing one would change other.

  while (currentDate < endDate) {
    const batchEndDate = new Date(currentDate);

    batchEndDate.setDate(batchEndDate.getDate() + batchSize);

    //.getDate gives date like 12-11-2022 so date is 12 and batch will be 12 + 100 so foe these many days

    if (batchEndDate > endDate) {
      batchEndDate.setTime(endDate.getTime());

      ///for the last batch if it exceeds then set end date and time set date sets date and time both(copy one date to another)
    }

    const batchResult = await processDateBatch(
      roomCategory,
      currentDate,
      batchEndDate,
      roomData.priceOverride,
    );

    totalRoomsCreated += batchResult.roomsCreated;
    totalDatesProcessed += batchResult.datesProcessed;

    currentDate.setTime(batchEndDate.getTime());
   
  }

  return {
    totalRoomsCreated,
    totalDatesProcessed,
  };
}




export async function processDateBatch(
  roomCategory: RoomCategory,
  startDate: Date,
  endDate: Date,
  priceOverride?: number,
) {
  let roomsCreated = 0;
  let datesProcessed = 0;
  const roomsToCreate: CreationAttributes<Room>[] = [];

  // 1. Fetch ALL existing rooms for this category within the batch date range in ONE query
  // Format dates to YYYY-MM-DD or use raw Date objects depending on your repository implementation
  const existingRoomsInBatch = await roomRepository.findRoomsByFieldRange(
    roomCategory.id,
    startDate,
    endDate
  );

  // 2. Map existing rooms into a Set of date strings (e.g., "2026-07-03") for instant O(1) lookups
  const existingDatesSet = new Set<string>(
    existingRoomsInBatch.map(room => 
      new Date(room.dateOfAvailability).toISOString().split('T')[0]
    )
  );

  const currentDate = new Date(startDate);

  // 3. Loop through the batch purely in memory
  while (currentDate <= endDate) {
    const dateString = currentDate.toISOString().split('T')[0];

    // Check the Set instead of hitting the database
    if (!existingDatesSet.has(dateString)) {
      const roomPayload = {
        hotelId: roomCategory.hotelId,
        roomCategoryId: roomCategory.id,
        dateOfAvailability: new Date(currentDate), // clone to break reference
        price: priceOverride || roomCategory.price,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      
      roomsToCreate.push(roomPayload);
    }

    currentDate.setDate(currentDate.getDate() + 1);
    datesProcessed++;
  }

  // 4. Fire the single bulk write query
  if (roomsToCreate.length > 0) {
    logger.info(`Creating ${roomsToCreate.length} rooms`);
    await roomRepository.bulkCreate(roomsToCreate);
    roomsCreated += roomsToCreate.length;
  }

  return {
    roomsCreated,
    datesProcessed,
  };
}

//batch wise processing
//Here ,firslty we make set and store all the unique dates only and then we loop through all the dates that current to end to find that if it exists in set if not exist then we can sat that that dates are available and we can gernerate room for them



//-----------This causes N+1 problem
// export async function processDateBatch(
//   roomCategory: RoomCategory,
//   startDate: Date,
//   endDate: Date,
//   priceOverride?: number,
// ) {
//   let roomsCreated = 0;
//   let datesProcessed = 0;
//   const roomsToCreate: CreationAttributes<Room>[] = [];

//   const currentDate = new Date(startDate);

//   // SELECT * FROM ROOM_CATEGORY WHERE ID = ? AND DATE_OF_AVAILABILITY BETWEEN ? and ?
//   // TODO: Use a better query to get the rooms
//   while (currentDate <= endDate) {
//     const existingRoom = await roomRepository.findByRoomCategoryIdAndDate(
//       roomCategory.id,
//       currentDate,
//     );

//     logger.info(
//       `Existing room: ${JSON.stringify(existingRoom)} : ${currentDate}`,
//     );

//     if (!existingRoom) {
//       const roomPayload = {
//         hotelId: roomCategory.hotelId,
//         roomCategoryId: roomCategory.id,
//         dateOfAvailability: new Date(currentDate),
//         price: priceOverride || roomCategory.price,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         deletedAt: null,
//       };
//       console.log(`Room payload: ${JSON.stringify(roomPayload)}`);
//       roomsToCreate.push(roomPayload);
//     }

//     currentDate.setDate(currentDate.getDate() + 1);
//     datesProcessed++;
//   }

//   console.log(`Rooms to create: ${JSON.stringify(roomsToCreate)}`);

//   if (roomsToCreate.length > 0) {
//     logger.info(`Creating ${roomsToCreate.length} rooms`);
//     await roomRepository.bulkCreate(roomsToCreate);
//     roomsCreated += roomsToCreate.length;
//   }

//   return {
//     roomsCreated,
//     datesProcessed,
//   };
// }