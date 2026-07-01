import logger from "../config/logger.config";
import User from "../db/models/user.model";
import { createUserDTO } from "../dto/user.dto";
import { NotFoundError } from "../utils/error/app.error";

export async function createUser(userData: createUserDTO) {
  const user = await User.create({
    username: userData.username,
    email: userData.email,
    password: userData.password,
  });

 

  return user;
}

export async function getAll() {
  const users = await User.findAll({
    attributes: ["id", "username", "email", "created_at", "updated_at"],
  });
  return users;
}

export async function getUserbyEmail(email: string) {
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  

  if (!user) {
    logger.error(`User with ${email} id not available`);
    throw new NotFoundError(`Not found user with  ${email}`);
  }

  logger.info(`user with given id : ${user.id}`);
  return user;
}

export async function getUserbyId(id: number) {
  const user = await User.findByPk(id);
  

  if (!user) {
    logger.error(`User with ${id} id not available`);
    throw new NotFoundError(`Not found User with  ${id}`);
  }

  logger.info(`User with given id : ${user.id}`);
  return user;
}


