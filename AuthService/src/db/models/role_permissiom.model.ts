import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "./sequelize";

class RolePermission extends Model<InferAttributes<RolePermission>, InferCreationAttributes<RolePermission>> {
  declare id: CreationOptional<number>;
  declare roleId:number;
  declare permissionId:number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

RolePermission.init(
  {
    id: {
      type: "INTEGER",
      autoIncrement: true,
      primaryKey: true,
      
    },
     permissionId: {
      type: "INTEGER",
      
    },
   
     roleId: {
      type: "INTEGER",
      primaryKey: true,
      
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
    tableName:'Role_Permissions',
     sequelize: sequelize,
    underscored: true, // createdAt --> created_at
    timestamps: true, // createdAt, updatedAt
  },
);


export default RolePermission;