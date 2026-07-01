import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "./sequelize";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare password: string;
  declare email: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: "INTEGER",
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: "STRING",
      allowNull: false,
    },
    email: {
      type: "STRING",
      allowNull: false,
    },
    password: {
      type: "STRING",
      allowNull: false,
    },
    createdAt: {
      type: "DATE",
      defaultValue: new Date(),
    },
    updatedAt: {
      type: "DATE",
      defaultValue: new Date(),
    },
  },
  {
    tableName:'Users',
     sequelize: sequelize,
    underscored: true, // createdAt --> created_at
    timestamps: true, // createdAt, updatedAt
  },
);


export default User;