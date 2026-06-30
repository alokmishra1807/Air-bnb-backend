import { NextFunction, Request, Response } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";

interface JwtUser {
  id: number;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtUser;
}

export const isAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        message: "Please login",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    const decodedValue = jwt.verify(
      token,
      process.env.SECRET_KEY as string,
    ) as JwtPayload;

    if (!decodedValue.id || !decodedValue.email) {
      res.status(401).json({
        message: "Please login-Invalid token ",
      });
      return;
    }

    req.user = {
      id: decodedValue.id,
      email: decodedValue.email,
    };
    next();
  } catch (error) {
    console.log("JWT token error :", error);
    res.status(401).json({
      message: "Please login-Jwt error",
    });
  }
};
