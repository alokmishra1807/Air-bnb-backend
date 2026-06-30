import { NextFunction, Request, Response } from "express";
import { getRedisConnObject } from "../config/redis.config";
import { AuthenticatedRequest } from "./isAuth.middleware";


const redisConnection = getRedisConnObject();

export async function IpLimiter(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const ip = req.ip;

  /*  console.log(req.ip); */

  const key = `rate-limit:${ip}`;

  /*  console.log('Ip limiter') */

  const limit = 5; // Max requests
  const windowTime = 60; // 1 minutes in seconds

  const requests = await redisConnection.incr(key);

  if (requests === 1) {
    
    await redisConnection.expire(key, windowTime);
  }

  if (requests > limit) {
    return res
      .status(429)
      .json({ message: "Too many requests, try again later." });
  }

  next();
}

export async function authLimiter(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  //   console.log(req.user);
  const key = `rate-limit:user:${req.user!.id}`;

  const count = await redisConnection.incr(key);

  /*  console.log('user Limitter') */

  if (count === 1) {
    await redisConnection.expire(key, 60);
  }

  if (count > 5) {
    return res.status(429).json({
      message: "Too many requests",
    });
  }

  next();
}
