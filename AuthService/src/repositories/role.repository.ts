import logger from "../config/logger.config";
import Role from "../db/models/role.model";
import { CreateRoleRequestDTO } from "../dto/role.dto";

import { NotFoundError } from "../utils/error/app.error";

export async function createRole(roleData: CreateRoleRequestDTO) {

  // console.log(roleData.description);
  // console.log(roleData.name);
  const role = await Role.create({
    name: roleData.name,
    description: roleData.description,
  });

  return role;
}

export async function getAllRoles() {
  const roles = await Role.findAll({
    attributes: ["name", "description", "created_at", "updated_at"],
  });
  return roles;
}

export async function getRolebyId(id: number) {
  const role = await Role.findByPk(id);

  if (!role) {
    logger.error(`role with ${id} id not available`);
    throw new NotFoundError(`Not found role with  ${id}`);
  }

  logger.info(`role with given id : ${role.id}`);
  return role;
}

export async function getRoleByName(name: string) {
  const role = await Role.findOne({
    where: {
      name: name,
    },
  });

  if (!role) {
    logger.error(`role with ${name} id not available`);
    throw new NotFoundError(`Not found role with  ${name}`);
  }

  logger.info(`role with given id : ${role.name}`);
  return role;
}

export async function deleteRole(id: number) {
  const role = Role.destroy({
    where: {
      id: id,
    },
  });

  logger.info(`deleted role with id: ${id}`);
  return role;
}

export async function updateRole(id: number,roleData: Partial<CreateRoleRequestDTO>) {
  const role = await Role.findByPk(id);


  if (!role) {
    logger.error("role does not exist");
    throw new NotFoundError("No role exists");
  }

 

  await role.update({
   name:roleData.name,
   description:roleData.description

  })
}