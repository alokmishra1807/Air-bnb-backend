import { Queue} from 'bullmq';
//import { getRedisConnObject } from '../config/redis.config';


export const ROOM_GENERATOR_QUEUE = "queue-room-generator";


export const roomGeneratorQueue = new Queue(ROOM_GENERATOR_QUEUE,{
    connection: {
            host: "redis",
            port: 6379
        }
})