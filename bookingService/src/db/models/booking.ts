import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "./sequelize";

type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

class Booking extends Model<
  InferAttributes<Booking>,
  InferCreationAttributes<Booking>
> {
  declare id: CreationOptional<number>;
  declare UserId: number;
  declare hotelId: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare bookingAmount:number;
  declare totalGuests:number;
  declare status: CreationOptional<BookingStatus>;
}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
    },
    hotelId: {
      type: DataTypes.INTEGER,
    },

    createdAt: {
      type: DataTypes.TIME,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.TIME,
      defaultValue: new Date(),
    },
    status: {
      type: DataTypes.ENUM,
      values: ["PENDING", "CONFIRMED", "CANCELLED"],
      defaultValue: "PENDING",
    },
    bookingAmount:{
      type:DataTypes.INTEGER,
      
    },
    totalGuests:{
      type:DataTypes.INTEGER,
      defaultValue:1
    }
  },
  {
    tableName: "bookings",
    sequelize: sequelize,
     underscored:true,// createdAt --> created_at
    timestamps: true, // createdAt, updatedAt
  },
);

export default Booking;
