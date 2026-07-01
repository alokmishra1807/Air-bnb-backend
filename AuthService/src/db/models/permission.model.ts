import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "./sequelize";

class Permission extends Model<InferAttributes<Permission>, InferCreationAttributes<Permission>> {
  declare id: CreationOptional<number>;
  declare name:String;
  declare description:String;
  declare resource:String;
  declare action: String;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Permission.init(
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
     resource:{
      type: "STRING",
      allowNull: false,
    },
     action:{
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


export default Permission;