import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "./sequelize";
import Booking from "./booking";

class IdempotencyKey extends Model<
  InferAttributes<IdempotencyKey>,
  InferCreationAttributes<IdempotencyKey>
> {
  declare id: CreationOptional<number>;
  declare idemkey: string;
  declare bookingId: ForeignKey<Booking["id"]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare finalized:Boolean;
}

IdempotencyKey.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    idemkey: {
      type: DataTypes.STRING(191),
      allowNull: false,
      unique: true,
    },
    finalized:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,

    },

    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "bookings",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "idempotencykey",
    timestamps: true,
    underscored:true,
    
    
  },
);




export default IdempotencyKey;
