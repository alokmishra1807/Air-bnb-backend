import Redis from "ioredis";
import Redlock from "redlock";

export const redisClient = new Redis(process.env.REDIS_URL!);

export const redlock = new Redlock([redisClient as any], {
  retryCount: 10,
  retryDelay: 200,
  retryJitter: 200,
});