import {  Job, Worker } from "bullmq";
import { RoomGenerationJob } from "../dto/roomGeneration.dto";
import { ROOM_GENERATOR_QUEUE } from "../queue/roomGeneration.queue";
import { ROOM_GENERATOR_PAYLOAD } from "../producers/roomGeneration.proccessor";
import { getRedisConnObject } from "../config/redis.config";
import logger from "../config/logger.config";
import { generateRooms } from "../services/roomGeneration.service";




export const setUpRoomGenerationFunction = ()=>{
const emailProccessor = new Worker<RoomGenerationJob>(
    ROOM_GENERATOR_QUEUE,
    async (job : Job)=>{


        if(job.name !== ROOM_GENERATOR_PAYLOAD){
            throw new Error("Invalid Job name");

        }

         
            

              const payload = job.data;
            console.log(`Processing room generation for: ${JSON.stringify(payload)}`);

            await generateRooms(payload);

            logger.info(`Room generation completed for: ${JSON.stringify(payload)}`);

    },
    {
        connection: getRedisConnObject as any
    }

)

emailProccessor.on("failed",()=>{
    console.log("Room generation processing failed")
})

emailProccessor.on("completed",()=>{
    console.log("Room generation processing completed successfully")
})


}

