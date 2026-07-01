import logger from "../config/logger.config";
import Permission from "../db/models/permission.model";
import { CreatePermissionRequestDTO } from "../dto/permission.dto";

import { NotFoundError } from "../utils/error/app.error";

export async function createPermission(
  permissionData: CreatePermissionRequestDTO,
) {
  const permission = await Permission.create({
    name: permissionData.Name,
    description: permissionData.Description,
    resource: permissionData.resource,
    action: permissionData.action,
  });

  return permission;
}

export async function getAll() {
  const permission = await Permission.findAll({
    attributes: [
      "name",
      "description",
      "resource",
      "action",
      "created_at",
      "updated_at",
    ],
  });
  return permission;
}

export async function getPermissionbyId(id: number) {
  const permission = await Permission.findByPk(id);

  if (!permission) {
    logger.error(`permission with ${id} id not available`);
    throw new NotFoundError(`Not found permission with  ${id}`);
  }

  logger.info(`role with given id : ${permission.id}`);
  return permission;
}

export async function getPermissionByName(name: string) {
  const permission = await Permission.findOne({
    where: {
      name: name,
    },
  });

  if (!permission) {
    logger.error(`role with ${name} id not available`);
    throw new NotFoundError(`Not found role with  ${name}`);
  }

  logger.info(`role with given id : ${permission.name}`);
  return permission;
}

export async function deletePermission(id: number) {
  const permission = Permission.destroy({
    where: {
      id: id,
    },
  });

  logger.info(`deleted role with id: ${id}`);
  return permission;
}

export async function updatePermissionbyId(
  id: number,
  permissionData: Partial<CreatePermissionRequestDTO>,
) {
  const permission = await Permission.findByPk(id);

  if (!permission) {
    logger.error("permission does not exist");
    throw new NotFoundError("No permission exists");
  }

  await permission.update({
    name: permissionData.Name,
    description: permissionData.Description,
    resource: permissionData.resource,
    action: permissionData.action,
  });
}
