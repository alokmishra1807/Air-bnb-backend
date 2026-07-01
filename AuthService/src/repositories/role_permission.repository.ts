import logger from "../config/logger.config";
import RolePermission from "../db/models/role_permissiom.model";
import { addRolePermissionDTO } from "../dto/permission.dto";
import { NotFoundError } from "../utils/error/app.error";

export async function getAllPermission() {

  console.log("here");
  const permission = await RolePermission.findAll();
  return permission;
}

export async function getRolePermissionbyId(id: number) {
  const permissionRole = await RolePermission.findByPk(id);

  if (!permissionRole) {
    logger.error(`permission with ${id} id not available`);
    throw new NotFoundError(`Not found permission with  ${id}`);
  }

  logger.info(`role with given id : ${permissionRole.id}`);
  return permissionRole;
}

export async function getRolePermissionbyRoleId(id: number) {
  const permissionRole = await RolePermission.findAll({
    where: {
      roleId: id,
    },
  });

  if (!permissionRole) {
    logger.error(`permission with ${id} id not available`);
    throw new NotFoundError(`Not found permission with  ${id}`);
  }


  return permissionRole;
}

export async function addRolePermission(
  rolePermissionData: addRolePermissionDTO,
) {
  const rolePermission = await RolePermission.create({
    roleId: rolePermissionData.roleId,
    permissionId: rolePermissionData.PermissionId,
  });

  return rolePermission;
}

export async function removePermsissionFromRole(
  roleId:number,permissionId:number
) {
  const rolePermission = await RolePermission.destroy({
    where: {
      roleId: roleId,
      permissionId:permissionId,
    },
  });

  return rolePermission;
}
