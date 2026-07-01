import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "./sequelize";

class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
  declare id: CreationOptional<number>;
  declare name:String;
  declare description:String;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Role.init(
  {
    id: {
      type: "INTEGER",
      autoIncrement: true,
      primaryKey: true,
      
    },
   
    name:{
      type: "STRING",
      allowNull: false,
      unique:true,
    },
    description:{
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
    tableName:'Roles',
     sequelize: sequelize,
    underscored: true, // createdAt --> created_at
    timestamps: true, // createdAt, updatedAt
  },
);


export default Role;