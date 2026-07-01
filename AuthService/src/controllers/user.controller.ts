import { NextFunction, Request, Response } from "express";
import {
  createUserService,
  getUserByIdService,
  loginUserService,
} from "../services/user.service";
import { AuthenticatedRequest } from "../middleware/isAuth";


export async function getUserByIdHandler(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  // console.log(req.user);
  const userResponse = await getUserByIdService(Number(req.user?.id));

  res.status(200).json({
    message: "User found Successfully",
    data: userResponse,
    success: true,
  });
}

export async function createUserHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const user = await createUserService(req.body);
  res.status(201).json({
    message: "User Created Successfully",
    data: {
      email: user.email,
      username: user.username,
    },
    success: true,
  });
}

export async function loginUserHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = await loginUserService(req.body);
  res.status(200).json({
    message: "User logged in Successfully",
    token: token,
    success: true,
  });
}
