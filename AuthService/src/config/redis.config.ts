import IORedis, { Redis } from 'ioredis';
import { serverConfig } from '.';




function connectToRedis() {
    try {

        let connection: Redis;

        return () => {
            if (!connection) {
                connection = new IORedis(serverConfig.REDIS_SERVER_URL);
                return connection;
            }

            return connection;
        }
        

    } catch (error) {
        console.error('Error connecting to Redis:', error);
        throw error;
    }
}

export const getRedisConnObject = connectToRedis();