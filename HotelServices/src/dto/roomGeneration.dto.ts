import { z } from "zod";


export const RoomGenerationJobSchema = z.object({
    roomCategoryId: z.number().positive(),
    startDate: z.iso.datetime(),
    endDate: z.iso.datetime(),
    priceOverride: z.number().positive().optional(),
    batchSize: z.number().positive().default(100),
});

export type RoomGenerationJob = z.infer<typeof RoomGenerationJobSchema>;


export interface RoomGenerationResponse {
    success: boolean;
    totalRoomsCreated: number;
    totalDatesProcessed: number;
    errors: string[];
    jobId: string;
}