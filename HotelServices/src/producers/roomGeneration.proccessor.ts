import { RoomGenerationJob } from "../dto/roomGeneration.dto";
import { roomGeneratorQueue } from "../queue/roomGeneration.queue";

export const ROOM_GENERATOR_PAYLOAD = "payload:room"


export const addRoomGenerationJobToQueue = async (payload:RoomGenerationJob) =>{
    await roomGeneratorQueue.add(ROOM_GENERATOR_PAYLOAD,payload);

    console.log(`Rooms added to queue: ${JSON.stringify(payload)} `);

}