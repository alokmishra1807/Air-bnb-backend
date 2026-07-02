import { CreationAttributes, Op } from "sequelize";
import Room from "../db/models/rooms";
import BaseRepository from "./base.repository";

export class RoomReository extends BaseRepository<Room>{
    constructor(){
        super(Room);
    }

    async findByRoomCategoryIdAndDate(
        roomCategoryId: number,
        currentDate: Date
    ) {
        return await this.model.findOne({
            where: {
                roomCategoryId,
                dateOfAvailability: currentDate,
                deletedAt: null
            }
        })
    }


        async bulkCreate(rooms: CreationAttributes<Room>[]) {
        return await this.model.bulkCreate(rooms);
    }
    async findRoomsByFieldRange(roomCategoryId: number, startDate: Date, endDate: Date): Promise<Room[]> {
    return await Room.findAll({
      where: {
        roomCategoryId,
        dateOfAvailability: {
          [Op.between]: [startDate, endDate]
        }
      },
      attributes: ['dateOfAvailability'], // Only fetch the date to save memory/bandwidth
      raw: true
    });
  }


}